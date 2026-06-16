import * as path from 'path'
import { ExtensionContext, commands, window } from 'vscode'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node'

let client: LanguageClient

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(path.join('out', 'server.js'))

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] }
    }
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'javafx-fxml' },
      { scheme: 'untitled', language: 'javafx-fxml' }
    ],
    synchronize: {
      fileEvents: []
    }
  }

  client = new LanguageClient(
    'fxcompleter',
    'FXCompleter Language Server',
    serverOptions,
    clientOptions
  )

  context.subscriptions.push(
    commands.registerCommand('fxcompleter.fixAllImports', () => {
      const editor = window.activeTextEditor
      if (!editor || editor.document.languageId !== 'javafx-fxml') return

      client.sendRequest('workspace/executeCommand', {
        command: 'fxcompleter.fixAllImports',
        arguments: [editor.document.uri.toString()]
      } as any)
    })
  )

  context.subscriptions.push(
    commands.registerCommand('fxcompleter.addImport', (uri: string, importPath: string) => {
      client.sendRequest('workspace/executeCommand', {
        command: 'fxcompleter.addImport',
        arguments: [uri, importPath]
      } as any)
    })
  )

  context.subscriptions.push(
    commands.registerCommand('fxcompleter.removeUnusedImports', () => {
      const editor = window.activeTextEditor
      if (!editor || editor.document.languageId !== 'javafx-fxml') return
      client.sendRequest('workspace/executeCommand', {
        command: 'fxcompleter.removeUnusedImports',
        arguments: [editor.document.uri.toString()]
      } as any)
    })
  )

  client.start()
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined
  }
  return client.stop()
}
