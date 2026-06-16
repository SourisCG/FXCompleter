import * as fs from 'fs'
import * as path from 'path'
import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  Hover,
  TextDocumentPositionParams,
  DocumentFormattingParams,
  TextEdit,
  Diagnostic,
  DiagnosticSeverity,
  CodeAction,
  CodeActionKind,
  CodeActionParams,
  Command,
  DefinitionParams,
  Location,
  Range,
  Position,
  DidChangeWatchedFilesNotification,
  ExecuteCommandParams,
  WorkspaceEdit
} from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'
import {
  getCSSLanguageService,
  LanguageService
} from 'vscode-css-languageservice'
import { fxmlComponents, componentByTag } from './data/fxmlComponents'
import { commonAttributes, layoutAttributes, eventHandlerAttributes, attributeMap } from './data/fxmlAttributes'
import { javafxProperties } from './data/javafxProperties'
import { javafxSelectors } from './data/javafxSelectors'
import { resolveControllerClass, parseControllerMethods, clearControllerCache } from './data/controllerResolver'
import { fxmlSnippets } from './completions/snippets'
import { validateFxml } from './validation/validator'

const connection = createConnection(ProposedFeatures.all)
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

process.on('uncaughtException', (err) => {
  process.stderr.write(`[FXCompleter] Uncaught exception: ${err.message}\n${err.stack || ''}\n`)
})

process.on('unhandledRejection', (reason) => {
  process.stderr.write(`[FXCompleter] Unhandled rejection: ${reason}\n`)
})

let cssLanguageService: LanguageService
let workspaceRoot: string = ''

connection.onInitialize((params: InitializeParams): InitializeResult => {
  if (params.workspaceFolders && params.workspaceFolders.length > 0) {
    workspaceRoot = params.workspaceFolders[0].uri.replace('file://', '')
  }

  cssLanguageService = getCSSLanguageService({
    useDefaultDataProvider: false,
    customDataProviders: [javafxProperties]
  })

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        triggerCharacters: ['<', ' ', '.', ':', '-', '#', '"', "'", '/']
      },
      hoverProvider: true,
      documentFormattingProvider: true,
      definitionProvider: true,
      codeActionProvider: true
    }
  }
})

const prevDocTags = new Map<string, Set<string>>()

documents.onDidChangeContent(change => {
  validateTextDocument(change.document)

  const uri = change.document.uri
  const text = change.document.getText()

  const currentTags = new Set<string>()
  const tagRegex = /<(\w[\w.]*)(?:[^>]*)\/?>/g
  let m: RegExpExecArray | null
  while ((m = tagRegex.exec(text)) !== null) {
    const tagName = m[1]
    if (tagName.includes('.')) continue
    if (!componentByTag.get(tagName)) continue
    currentTags.add(tagName)
  }

  const prevTags = prevDocTags.get(uri) || new Set<string>()
  const newTags: string[] = []
  for (const tag of currentTags) {
    if (!prevTags.has(tag)) newTags.push(tag)
  }
  prevDocTags.set(uri, currentTags)

  const importRegex = /^<\?import\s+[\w.*]+\?>/gm
  let lastImportEnd = 0
  let missing: string[] = []
  for (const tag of newTags) {
    const comp = componentByTag.get(tag)
    if (!comp) continue
    if (text.includes(comp.importPath)) continue
    if (missing.includes(comp.importPath)) continue
    missing.push(comp.importPath)
  }
  if (missing.length === 0) return

  while ((m = importRegex.exec(text)) !== null) {
    lastImportEnd = m.index + m[0].length
  }
  while (lastImportEnd < text.length && text[lastImportEnd] === '\n') {
    lastImportEnd++
  }

  const insertPos = lastImportEnd > 0
    ? change.document.positionAt(lastImportEnd)
    : Position.create(0, 0)

  connection.workspace.applyEdit({
    changes: {
      [uri]: [{
        range: { start: insertPos, end: insertPos },
        newText: missing.map(p => `<?import ${p}?>`).join('\n') + '\n'
      }]
    }
  })
})

documents.onDidClose(e => {
  prevDocTags.delete(e.document.uri)
})

function getImports(text: string): string[] {
  const imports: string[] = []
  const regex = /<\?import\s+([\w.]+(?:\*)?)\s*\?>/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    imports.push(match[1])
  }
  return imports
}

function getControllerClass(text: string): string | null {
  const regex = /fx:controller\s*=\s*"([^"]+)"/g
  const match = regex.exec(text)
  return match ? match[1] : null
}

function getTextBeforePosition(doc: TextDocument, pos: { line: number; character: number }): string {
  const offset = doc.offsetAt({ line: pos.line, character: pos.character })
  const text = doc.getText()
  return text.substring(0, offset)
}

function getLinePrefix(doc: TextDocument, pos: { line: number; character: number }): string {
  const text = getTextBeforePosition(doc, pos)
  const lastNewline = text.lastIndexOf('\n')
  return text.substring(lastNewline + 1)
}

function getWordAtPosition(doc: TextDocument, pos: { line: number; character: number }): string {
  const text = doc.getText()
  const offset = doc.offsetAt({ line: pos.line, character: pos.character })
  let start = offset
  let end = offset
  while (start > 0 && /[\w.]/.test(text[start - 1])) start--
  while (end < text.length && /[\w.]/.test(text[end])) end++
  return text.substring(start, end)
}

function isInsideTagAttributeValue(text: string, offset: number): { inside: boolean; attributeName?: string } {
  const before = text.substring(0, offset)
  const quoteMatch = before.match(/(\w[\w.]*)\s*=\s*"([^"]*)$/)
  if (quoteMatch) {
    return { inside: true, attributeName: quoteMatch[1] }
  }
  return { inside: false }
}

function isInsideStyleTag(text: string, offset: number): boolean {
  const before = text.substring(0, offset)
  const styleOpen = before.lastIndexOf('<style')
  const styleClose = before.lastIndexOf('</style>')
  return styleOpen > styleClose
}

function isInlineStyle(text: string, offset: number): boolean {
  const before = text.substring(0, offset)
  return /style\s*=\s*"[^"]*$/.test(before)
}

function isStylesheetPath(text: string, offset: number): boolean {
  const before = text.substring(0, offset)
  return /stylesheets\s*=\s*"[^"]*$/.test(before)
}

function isFxmlSourcePath(text: string, offset: number): boolean {
  const before = text.substring(0, offset)
  return /source\s*=\s*"[^"]*$/.test(before)
}

function isInsideTag(text: string, offset: number): boolean {
  const before = text.substring(0, offset)
  const lastOpen = before.lastIndexOf('<')
  if (lastOpen === -1) return false
  const afterLastOpen = before.substring(lastOpen + 1)
  return !afterLastOpen.includes('>')
}

function isInsideTagName(text: string, offset: number): { inside: boolean; tagName: string } {
  const before = text.substring(0, offset)
  const tagStart = before.lastIndexOf('<')
  if (tagStart === -1) return { inside: false, tagName: '' }
  const tagContent = before.substring(tagStart + 1)
  if (tagContent.includes('>') || tagContent.startsWith('/') || tagContent.startsWith('?')) {
    return { inside: false, tagName: '' }
  }
  const nameMatch = tagContent.match(/^([\w]*)$/)
  if (nameMatch) {
    return { inside: true, tagName: nameMatch[1] }
  }
  return { inside: false, tagName: '' }
}

function isInsideAttribute(text: string, offset: number): { inside: boolean; currentTag: string; currentAttr: string } {
  const before = text.substring(0, offset)
  const tagStart = before.lastIndexOf('<')
  if (tagStart === -1) return { inside: false, currentTag: '', currentAttr: '' }
  const tagContent = before.substring(tagStart + 1)
  if (tagContent.includes('>') && !tagContent.includes('</')) {
    return { inside: false, currentTag: '', currentAttr: '' }
  }
  const tagNameMatch = tagContent.match(/^(\w+)/)
  const tagName = tagNameMatch ? tagNameMatch[1] : ''

  const afterTag = tagContent.replace(/^(\w+)/, '')
  const attrMatch = afterTag.match(/\s+(\w[\w.]*)$/)
  const currentAttr = attrMatch ? attrMatch[1] : ''

  return { inside: afterTag.includes(' ') && !afterTag.trim().startsWith('/'), currentTag: tagName, currentAttr }
}

function isEventHandlerContext(text: string, offset: number): boolean {
  const before = text.substring(0, offset)
  return /on\w+\s*=\s*"#$/.test(before)
}

connection.onCompletion((textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
  try {
    const document = documents.get(textDocumentPosition.textDocument.uri)
    if (!document) return []

    const text = document.getText()
    const offset = document.offsetAt(textDocumentPosition.position)
    const linePrefix = getLinePrefix(document, textDocumentPosition.position)
    const currentWord = getWordAtPosition(document, textDocumentPosition.position)

    const styleAttr = isInlineStyle(text, offset)
    const stylesheetAttr = isStylesheetPath(text, offset)
    const insideStyleBlock = isInsideStyleTag(text, offset)
    const { inside: insideTag, tagName } = isInsideTagName(text, offset)
    const { inside: insideAttr, currentTag, currentAttr } = isInsideAttribute(text, offset)
    const eventHandler = isEventHandlerContext(text, offset)

    if (eventHandler) {
      const controllerClass = getControllerClass(text)
      if (controllerClass && workspaceRoot) {
        const controllerPath = resolveControllerClass(controllerClass, workspaceRoot)
        if (controllerPath) {
          const methods = parseControllerMethods(controllerPath)
          return methods
            .filter(m => m.parameters.includes('ActionEvent') || m.parameters.includes('Event') || m.parameters.includes('MouseEvent') || m.parameters.includes('KeyEvent'))
            .map(m => ({
              label: m.name,
              kind: CompletionItemKind.Method,
              detail: `${m.returnType}(${m.parameters})`,
              insertText: m.name,
              sortText: '00'
            }))
        }
      }
      return [{ label: 'handle', kind: CompletionItemKind.Method, insertText: 'handle$1', sortText: '00' }]
    }

    if (isFxmlSourcePath(text, offset)) {
      const currentValue = text.substring(0, offset).match(/source\s*=\s*"([^"]*)$/)
      const currentPath = currentValue ? currentValue[1] : ''
      return getFxmlFileCompletions(document, currentPath)
    }

    if (styleAttr || insideStyleBlock) {
      const stylesheet = cssLanguageService.parseStylesheet(document)
      const cssCompletions = cssLanguageService.doComplete(document, textDocumentPosition.position, stylesheet)
      const items: CompletionItem[] = cssCompletions.items.map(item => ({
        ...item,
        kind: item.kind || CompletionItemKind.Property
      }))

      if (linePrefix.trim().startsWith('.') || linePrefix.trim().startsWith(':')) {
        javafxSelectors.forEach((selector, index) => {
          items.push({
            label: selector.name,
            kind: CompletionItemKind.Class,
            detail: selector.description,
            insertText: selector.name,
            sortText: `1${index.toString().padStart(4, '0')}`
          })
        })
      }

      return items
    }

  if (stylesheetAttr) {
    const currentValue = text.substring(0, offset).match(/stylesheets\s*=\s*"([^"]*)$/)
    const currentPath = currentValue ? currentValue[1] : ''
    return getCssFileCompletions(document, currentPath)
  }

    if (currentAttr === 'styleClass' || currentAttr === 'style') {
      const stylesheet = cssLanguageService.parseStylesheet(document)
      const cssCompletions = cssLanguageService.doComplete(document, textDocumentPosition.position, stylesheet)
      const items: CompletionItem[] = cssCompletions.items.map(item => ({
        ...item,
        kind: item.kind || CompletionItemKind.Property
      }))
      return items
    }

    const snippetLabels = new Set(['!', 'fxml', 'scene', 'anchor', 'border', 'vbox', 'hbox', 'grid', 'dialog', 'table', 'controller', 'import', 'include', 'define', 'root', 'script'])
    const snippets = fxmlSnippets
      .filter(s => snippetLabels.has(s.label) && (currentWord === '' || s.label.startsWith(currentWord.toLowerCase())))
      .map(s => ({
        label: s.label,
        kind: CompletionItemKind.Snippet,
        detail: s.description,
        insertText: s.snippet,
        insertTextFormat: InsertTextFormat.Snippet,
        sortText: '00' + s.sortText
      }))

    if (insideTag || (currentWord.length > 0 && !insideAttr)) {
      const matchedComponents: CompletionItem[] = []

      for (const comp of fxmlComponents) {
        if (!comp.variants) continue

        for (const variant of comp.variants) {
          const lowerName = comp.tag.toLowerCase()
          const lowerWord = (insideTag ? tagName : currentWord).toLowerCase()

          if (lowerName.startsWith(lowerWord) || lowerName.includes(lowerWord)) {
            matchedComponents.push({
              label: `${comp.tag} — ${variant.label}`,
              kind: CompletionItemKind.Class,
              detail: `${variant.description || comp.description}  —  ${comp.importPath}`,
              insertText: variant.snippet,
              insertTextFormat: InsertTextFormat.Snippet,
              sortText: variant.sortText + '_' + lowerName,
              data: { tag: comp.tag, importPath: comp.importPath, variant: variant.label }
            })
          }
        }
      }

      return [...snippets, ...matchedComponents]
    }

    if (insideAttr && currentTag) {
      const comp = componentByTag.get(currentTag)
      if (comp && currentAttr === '') {
        const items: CompletionItem[] = []

        const sortedAttrs = comp.attributes.slice()
        const seen = new Set<string>()

        for (const attr of sortedAttrs) {
          if (seen.has(attr)) continue
          seen.add(attr)
          const info = attributeMap.get(attr)
          items.push({
            label: attr,
            kind: CompletionItemKind.Property,
            detail: info ? info.description : '',
            insertText: `${attr}="$1"`,
            insertTextFormat: InsertTextFormat.Snippet,
            sortText: `10`
          })
        }

        for (const attr of commonAttributes) {
          if (seen.has(attr.name)) continue
          seen.add(attr.name)
          items.push({
            label: attr.name,
            kind: CompletionItemKind.Property,
            detail: attr.description,
            insertText: attr.name === 'fx:id' ? 'fx:id="$1"' : `${attr.name}="$1"`,
            insertTextFormat: InsertTextFormat.Snippet,
            sortText: `20`
          })
        }

        for (const attr of eventHandlerAttributes) {
          if (seen.has(attr.name)) continue
          items.push({
            label: attr.name,
            kind: CompletionItemKind.Event,
            detail: attr.description,
            insertText: `${attr.name}="#$1"`,
            insertTextFormat: InsertTextFormat.Snippet,
            sortText: `30`
          })
        }

        for (const attr of layoutAttributes) {
          if (seen.has(attr.name)) continue
          items.push({
            label: attr.name,
            kind: CompletionItemKind.Property,
            detail: attr.description,
            insertText: `${attr.name}="$1"`,
            insertTextFormat: InsertTextFormat.Snippet,
            sortText: `40`
          })
        }

        return items
      }

      if (currentAttr === 'xmlns') {
        return [{
          label: 'xmlns:fx="http://javafx.com/fxml"',
          kind: CompletionItemKind.Property,
          detail: 'FXML namespace declaration',
          insertText: 'xmlns:fx="$1"',
          insertTextFormat: InsertTextFormat.Snippet,
          sortText: '00'
        }]
      }

      const attrInfo = attributeMap.get(currentAttr)
      if (attrInfo && attrInfo.values) {
        if (currentAttr === 'fx:id') {
          const tagLower = currentTag.charAt(0).toLowerCase() + currentTag.slice(1)
          return [{
            label: `${tagLower} + id`,
            kind: CompletionItemKind.Value,
            insertText: `${tagLower}${currentTag}$1`,
            insertTextFormat: InsertTextFormat.Snippet,
            sortText: '00'
          }]
        }
        if (currentAttr === 'onAction' || currentAttr.startsWith('on')) {
          return [{
            label: '#handle + Event',
            kind: CompletionItemKind.Value,
            detail: 'Event handler method reference',
            insertText: '#$1',
            insertTextFormat: InsertTextFormat.Snippet,
            sortText: '00'
          }]
        }
        return attrInfo.values.map(v => ({
          label: v,
          kind: CompletionItemKind.Value,
          insertText: v,
          sortText: '00'
        }))
      }

      return []
    }

    return []
  } catch (err: any) {
    connection.console.error(`[FXCompleter] Completion error: ${err.message}`)
    return []
  }
})

connection.onHover((textDocumentPosition: TextDocumentPositionParams): Hover | null => {
  const document = documents.get(textDocumentPosition.textDocument.uri)
  if (!document) return null

  const text = document.getText()
  const offset = document.offsetAt(textDocumentPosition.position)
  const word = getWordAtPosition(document, textDocumentPosition.position)

  const comp = componentByTag.get(word)
  if (comp) {
    return {
      contents: {
        kind: 'markdown',
        value: [
          `**${comp.tag}**`,
          '',
          comp.description,
          '',
          `**Import:** \`${comp.importPath}\``,
          '',
          `**Categories:** ${comp.categories.join(', ')}`,
          '',
          comp.attributes.length > 0 ? `**Attributes:** ${comp.attributes.join(', ')}` : ''
        ].join('\n')
      }
    }
  }

  const attrInfo = attributeMap.get(word)
  if (attrInfo) {
    return {
      contents: {
        kind: 'markdown',
        value: [
          `**${attrInfo.name}**`,
          '',
          attrInfo.description,
          '',
          `**Type:** ${attrInfo.type}`
        ].join('\n')
      }
    }
  }

  const stylesheet = cssLanguageService.parseStylesheet(document)
  return cssLanguageService.doHover(document, textDocumentPosition.position, stylesheet)
})

connection.onDefinition((params: DefinitionParams): Location | null => {
  const document = documents.get(params.textDocument.uri)
  if (!document) return null

  const text = document.getText()
  const offset = document.offsetAt(params.position)

  const controllerMatch = text.substring(Math.max(0, offset - 100), offset + 100).match(/fx:controller\s*=\s*"([^"]+)"/)
  if (controllerMatch) {
    const controllerPath = resolveControllerClass(controllerMatch[1], workspaceRoot)
    if (controllerPath) {
      const uri = `file://${controllerPath}`
      return Location.create(uri, Range.create(0, 0, 0, 0))
    }
    return null
  }

  const stylesheetMatch = text.substring(Math.max(0, offset - 100), offset + 100).match(/stylesheets\s*=\s*"([^"]+)"/)
  if (stylesheetMatch) {
    const cssPath = stylesheetMatch[1]
    const absolutePath = path.resolve(workspaceRoot, cssPath)
    if (fs.existsSync(absolutePath)) {
      return Location.create(`file://${absolutePath}`, Range.create(0, 0, 0, 0))
    }
    return null
  }

  return null
})

connection.onCodeAction((params: CodeActionParams): (Command | CodeAction)[] => {
  const document = documents.get(params.textDocument.uri)
  if (!document) return []

  const actions: (Command | CodeAction)[] = []
  let hasImportDiagnostics = false
  let hasUnusedDiagnostics = false
  const totalLines = document.getText().split('\n').length

  for (const diagnostic of params.context.diagnostics) {
    if (diagnostic.data && (diagnostic.data as any).importPath) {
      const data = diagnostic.data as any

      if (data.type === 'unusedImport') {
        hasUnusedDiagnostics = true
        actions.push({
          title: 'Remove unused import',
          kind: CodeActionKind.QuickFix,
          diagnostics: [diagnostic],
          edit: {
            changes: {
              [params.textDocument.uri]: [{
                range: {
                  start: diagnostic.range.start,
                  end: diagnostic.range.end.line + 1 < totalLines
                    ? { line: diagnostic.range.end.line + 1, character: 0 }
                    : diagnostic.range.end
                },
                newText: ''
              }]
            }
          }
        } as CodeAction)
      } else {
        hasImportDiagnostics = true
        actions.push({
          title: `Add import for ${data.tag}`,
          kind: CodeActionKind.QuickFix,
          diagnostics: [diagnostic],
          command: {
            command: 'fxcompleter.addImport',
            arguments: [params.textDocument.uri, data.importPath]
          }
        } as CodeAction)
      }
    }
  }

  if (hasImportDiagnostics) {
    actions.push({
      title: 'Fix all missing imports',
      kind: CodeActionKind.QuickFix,
      command: {
        command: 'fxcompleter.fixAllImports',
        arguments: [params.textDocument.uri]
      }
    } as CodeAction)
  }

  if (hasUnusedDiagnostics) {
    actions.push({
      title: 'Remove all unused imports',
      kind: CodeActionKind.QuickFix,
      command: {
        command: 'fxcompleter.removeUnusedImports',
        arguments: [params.textDocument.uri]
      }
    } as CodeAction)
  }

  return actions
})

connection.onDocumentFormatting((params: DocumentFormattingParams): TextEdit[] => {
  const document = documents.get(params.textDocument.uri)
  if (!document) return []

  const text = document.getText()
  const lines = text.split('\n')
  const edits: TextEdit[] = []
  let indentLevel = 0
  const indentSize = params.options.tabSize || 2
  const useSpaces = params.options.insertSpaces !== false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    if (!trimmed) continue

    const closesTag = /^<\//.test(trimmed) || /^<\w+[^>]*\/>/.test(trimmed)
    const indent = closesTag ? Math.max(0, indentLevel - 1) : indentLevel

    const indentation = useSpaces ? ' '.repeat(indent * indentSize) : '\t'.repeat(indent)
    const formattedLine = indentation + trimmed
    if (formattedLine !== line) {
      edits.push({
        range: {
          start: { line: i, character: 0 },
          end: { line: i, character: line.length }
        },
        newText: formattedLine
      })
    }

    if (/^<\w[^>]*[^/]>$/.test(trimmed) && !trimmed.endsWith('/>') && !trimmed.startsWith('</')) {
      indentLevel++
    } else if (/^<\//.test(trimmed)) {
      indentLevel = Math.max(0, indentLevel - 1)
    }
  }

  return edits
})

connection.onDidChangeWatchedFiles(() => {
  clearControllerCache()
})

function validateTextDocument(textDocument: TextDocument): void {
  try {
    const text = textDocument.getText()
    const imports = getImports(text)
    const controllerClass = getControllerClass(text)

    const diagnostics = validateFxml({
      document: textDocument,
      workspaceRoot,
      imports,
      controllerClass: controllerClass || undefined
    })

    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics })
  } catch (err: any) {
    connection.console.error(`[FXCompleter] Validation error: ${err.message}`)
  }
}

function findMissingComponentImports(text: string): string[] {
  const missing: string[] = []
  const used = new Set<string>()
  const tagRegex = /<(\w[\w.]*)(?:[^>]*)\/?>/g
  let match: RegExpExecArray | null
  while ((match = tagRegex.exec(text)) !== null) {
    used.add(match[1])
  }
  for (const tag of used) {
    const comp = componentByTag.get(tag)
    if (!comp) continue
    if (text.includes(comp.importPath)) continue
    if (missing.includes(comp.importPath)) continue
    missing.push(comp.importPath)
  }
  return missing
}

function getFileCompletions(document: TextDocument, currentValue: string, exts: string[]): CompletionItem[] {
  const items: CompletionItem[] = []

  const docDir = path.dirname(document.uri.replace('file://', ''))
  const root = workspaceRoot || docDir
  const dirsToSearch = [root]
  const found = new Set<string>()

  while (dirsToSearch.length > 0) {
    const dir = dirsToSearch.pop()!
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'target') {
          dirsToSearch.push(fullPath)
        } else if (entry.isFile()) {
          const ext = exts.find(e => entry.name.endsWith(e))
          if (ext) {
            const relative = path.relative(root, fullPath)
            if (!found.has(relative)) {
              found.add(relative)
              const insertText = currentValue.includes('@')
                ? `@${relative}`
                : relative
              items.push({
                label: relative,
                kind: CompletionItemKind.File,
                detail: ext === '.fxml' ? 'FXML file' : 'CSS file',
                insertText,
                sortText: '00'
              })
            }
          }
        }
      }
    } catch {}
  }

  items.sort((a, b) => {
    const aStartsWithDocDir = a.label.startsWith(path.relative(root, docDir))
    const bStartsWithDocDir = b.label.startsWith(path.relative(root, docDir))
    if (aStartsWithDocDir && !bStartsWithDocDir) return -1
    if (!aStartsWithDocDir && bStartsWithDocDir) return 1
    return a.label.localeCompare(b.label)
  })

  return items
}

function getCssFileCompletions(document: TextDocument, currentValue: string): CompletionItem[] {
  return getFileCompletions(document, currentValue, ['.css', '.fx.css'])
}

function getFxmlFileCompletions(document: TextDocument, currentValue: string): CompletionItem[] {
  return getFileCompletions(document, currentValue, ['.fxml'])
}

connection.onExecuteCommand((params: ExecuteCommandParams) => {
  try {
    if (params.command === 'fxcompleter.addImport' && params.arguments) {
      const [uri, second] = params.arguments as any
      const document = documents.get(uri)
      if (!document) return

      let importStatement: string
      let position: Position

      if (typeof second === 'string') {
        importStatement = `<?import ${second}?>\n`
        const text = document.getText()
        if (text.includes(second)) return

        const importRegex = /^<\?import\s+[\w.*]+\?>/gm
        let lastImportEnd = 0
        let match: RegExpExecArray | null
        while ((match = importRegex.exec(text)) !== null) {
          lastImportEnd = match.index + match[0].length
        }
        while (lastImportEnd < text.length && text[lastImportEnd] === '\n') {
          lastImportEnd++
        }
        position = lastImportEnd > 0
          ? document.positionAt(lastImportEnd)
          : Position.create(0, 0)
      } else {
        position = second.position
        importStatement = second.importStatement
      }

      connection.workspace.applyEdit({
        changes: {
          [uri]: [{
            range: {
              start: position,
              end: position
            },
            newText: importStatement
          }]
        }
      })
    }

    if (params.command === 'fxcompleter.removeUnusedImports' && params.arguments) {
      const [uri] = params.arguments as any
      const document = documents.get(uri)
      if (!document) return

      const text = document.getText()
      const importRegex = /^<\?import\s+([\w.]+(?:\*)?)\s*\?>/gm
      const tagRegex = /<(\w[\w.]*)(?:[^>]*)\/?>/g

      const usedTags = new Set<string>()
      let m: RegExpExecArray | null
      while ((m = tagRegex.exec(text)) !== null) {
        const tagName = m[1]
        if (tagName.startsWith('?') || tagName.includes('.')) continue
        usedTags.add(tagName)
      }

      const fxmlSubTags = new Set(['top', 'bottom', 'left', 'right', 'center', 'xAxis', 'yAxis', 'columns', 'tabs', 'panes', 'items', 'content', 'graphic', 'contextMenu', 'tooltip'])

      const lines = text.split('\n')
      const edits: TextEdit[] = []

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const importMatch = line.match(/^<\?import\s+([\w.]+(?:\*)?)\s*\?>/)
        if (!importMatch) continue
        if (importMatch[1].endsWith('.*')) continue
        const className = importMatch[1].split('.').pop()
        if (!className) continue
        if (usedTags.has(className) || fxmlSubTags.has(className)) continue
        edits.push({
          range: {
            start: { line: i, character: 0 },
            end: i + 1 < lines.length
              ? { line: i + 1, character: 0 }
              : { line: i, character: line.length }
          },
          newText: ''
        })
      }

      if (edits.length === 0) return

      connection.workspace.applyEdit({
        changes: {
          [uri]: edits
        }
      })
    }

    if (params.command === 'fxcompleter.fixAllImports' && params.arguments) {
      const [uri] = params.arguments as any
      const document = documents.get(uri)
      if (!document) return

      const text = document.getText()
      const missing = findMissingComponentImports(text)
      if (missing.length === 0) return

      const importRegex = /^<\?import\s+[\w.*]+\?>/gm
      let lastImportEnd = 0
      let match: RegExpExecArray | null
      while ((match = importRegex.exec(text)) !== null) {
        lastImportEnd = match.index + match[0].length
      }
      while (lastImportEnd < text.length && text[lastImportEnd] === '\n') {
        lastImportEnd++
      }

      const insertPos = lastImportEnd > 0
        ? document.positionAt(lastImportEnd)
        : Position.create(0, 0)

      const newText = missing.map(p => `<?import ${p}?>`).join('\n') + '\n'

      connection.workspace.applyEdit({
        changes: {
          [uri]: [{
            range: { start: insertPos, end: insertPos },
            newText
          }]
        }
      })
    }
  } catch (err: any) {
    connection.console.error(`[FXCompleter] ExecuteCommand error: ${err.message}`)
  }
})

connection.onInitialized(() => {
  connection.client.register(DidChangeWatchedFilesNotification.type, {
    watchers: [{ globPattern: '**/*.java' }]
  }).catch(err => {
    connection.console.error(`[FXCompleter] Failed to register file watcher: ${err.message}`)
  })
})

documents.listen(connection)
connection.listen()
