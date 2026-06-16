import * as fs from 'fs'
import * as path from 'path'

export interface ControllerMethod {
  name: string
  parameters: string
  returnType: string
}

const controllerCache = new Map<string, ControllerMethod[]>()

export function resolveControllerClass(controllerValue: string, workspaceRoot: string): string | null {
  const relativePath = controllerValue.replace(/\./g, path.sep) + '.java'
  const srcPaths = [
    path.join(workspaceRoot, 'src', 'main', 'java', relativePath),
    path.join(workspaceRoot, 'src', relativePath),
    path.join(workspaceRoot, relativePath)
  ]

  for (const srcPath of srcPaths) {
    if (fs.existsSync(srcPath)) {
      return srcPath
    }
  }
  return null
}

export function parseControllerMethods(filePath: string): ControllerMethod[] {
  if (controllerCache.has(filePath)) {
    return controllerCache.get(filePath)!
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const methods: ControllerMethod[] = []
    const methodRegex = /(public|protected)\s+(\w+(?:<[^>]*>)?)\s+(\w+)\s*\(([^)]*)\)/g
    let match: RegExpExecArray | null

    while ((match = methodRegex.exec(content)) !== null) {
      methods.push({
        name: match[3],
        returnType: match[2],
        parameters: match[4].trim()
      })
    }

    controllerCache.set(filePath, methods)
    return methods
  } catch {
    return []
  }
}

export function clearControllerCache() {
  controllerCache.clear()
}
