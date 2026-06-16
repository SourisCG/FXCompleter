import { TextDocument } from 'vscode-languageserver-textdocument'
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver'
import { componentByTag } from '../data/fxmlComponents'
import { attributeMap } from '../data/fxmlAttributes'

export interface ValidationContext {
  document: TextDocument
  workspaceRoot: string
  imports: string[]
  controllerClass?: string
}

const fxmlSubTags = new Set([
  'top', 'bottom', 'left', 'right', 'center',
  'xAxis', 'yAxis',
  'columns', 'tabs', 'panes', 'items',
  'content', 'graphic',
  'contextMenu', 'tooltip'
])

export function validateFxml(context: ValidationContext): Diagnostic[] {
  const diagnostics: Diagnostic[] = []
  const { document } = context
  const text = document.getText()

  const openTagRegex = /<(\w[\w.]*)([^>]*)\/?>/g
  const importRegex = /<\?import\s+([\w.]+(?:\*)?)\s*\?>/g

  const usedImports = new Set<string>()
  let match: RegExpExecArray | null

  while ((match = importRegex.exec(text)) !== null) {
    usedImports.add(match[1])
  }

  const offsetToLineCol = (offset: number) => {
    const before = text.substring(0, offset)
    const line = before.split('\n').length - 1
    const lastNewline = before.lastIndexOf('\n')
    const col = lastNewline >= 0 ? offset - lastNewline - 1 : offset
    return { line, col }
  }

  const usedTags = new Set<string>()

  while ((match = openTagRegex.exec(text)) !== null) {
    const tagName = match[1]
    if (tagName.startsWith('?')) continue
    usedTags.add(tagName)

    const comp = componentByTag.get(tagName)
    if (!comp) {
      if (fxmlSubTags.has(tagName) || tagName.includes('.') || tagName.startsWith('fx:')) {
        continue
      }
      const { line, col } = offsetToLineCol(match.index)
      diagnostics.push({
        range: {
          start: { line, character: col },
          end: { line, character: col + match[0].length }
        },
        message: `Unknown FXML component: "${tagName}". Not a recognized JavaFX class.`,
        severity: DiagnosticSeverity.Warning,
        source: 'fxcompleter'
      })
      continue
    }

    const importNeeded = comp.importPath
    const importFound = Array.from(usedImports).some(imp =>
      imp === importNeeded || imp.endsWith('.*') || importNeeded.startsWith(imp.replace('*', ''))
    )

    if (!importFound) {
      const { line, col } = offsetToLineCol(match.index)
      diagnostics.push({
        range: {
          start: { line, character: col },
          end: { line, character: col + match[0].length }
        },
        message: `Missing import for "${tagName}". Add: <?import ${comp.importPath}?>`,
        severity: DiagnosticSeverity.Warning,
        source: 'fxcompleter',
        data: { tag: tagName, importPath: comp.importPath }
      })
    }

    const attrsMatch = match[2]
    if (attrsMatch) {
      const attrRegex = /([\w:-]+)\s*=\s*"([^"]*)"/g
      let attrMatch: RegExpExecArray | null
      const skippedAttrs = new Set(['style', 'styleClass', 'id'])
      while ((attrMatch = attrRegex.exec(attrsMatch)) !== null) {
        const attrName = attrMatch[1]
        if (attrName.startsWith('fx:') || attrName.startsWith('xmlns') || skippedAttrs.has(attrName)) {
          continue
        }

        const baseAttrName = attrName.includes('.') ? attrName.split('.')[1] : attrName
        const attrInfo = attributeMap.get(attrName) || attributeMap.get(baseAttrName)
        if (!attrInfo && !comp.attributes.includes(attrName) && !comp.attributes.includes(baseAttrName)) {
          const attrOffset = match.index + match[0].indexOf(attrMatch[0])
          const { line, col } = offsetToLineCol(attrOffset)
          diagnostics.push({
            range: {
              start: { line, character: col },
              end: { line, character: col + attrMatch[0].length }
            },
            message: `Unknown attribute "${attrName}" for component "${tagName}".`,
            severity: DiagnosticSeverity.Warning,
            source: 'fxcompleter'
          })
        }
      }
    }
  }

  for (const imp of usedImports) {
    if (imp.endsWith('.*')) continue
    const className = imp.split('.').pop()
    if (!className) continue
    if (!usedTags.has(className)) {
      const lines = text.split('\n')
      const line = lines.findIndex(l => {
        const m = l.match(/^<\?import\s+([\w.]+(?:\*)?)\s*\?>/)
        return m && m[1] === imp
      })
      if (line >= 0) {
        diagnostics.push({
          range: {
            start: { line, character: 0 },
            end: { line, character: lines[line].length }
          },
          message: `Unused import "${imp}". The class ${className} is not used in this FXML file.`,
          severity: DiagnosticSeverity.Information,
          source: 'fxcompleter',
          data: { importPath: imp, type: 'unusedImport' }
        })
      }
    }
  }

  return diagnostics
}
