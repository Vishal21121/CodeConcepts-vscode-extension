const vscode = require('vscode');

function getWebviewContent(uri, jsSrc) {
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="${uri}" />
        <script type="module" src="${jsSrc}"></script>
        <title>Vite + React</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>`
}

function displayWebview(context, lang) {
  console.log("displaying webview")
  const panel = vscode.window.createWebviewPanel(
    'questionDisplay',
    `Question of ${context.globalState.get("language")}`,
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );
  const cssPath = vscode.Uri.joinPath(context.extensionUri, 'webview-ui/screen-1/dist/assets/index.css')
  const cssSrc = panel.webview.asWebviewUri(cssPath);
  const jsPath = vscode.Uri.joinPath(context.extensionUri, 'webview-ui/screen-1/dist/assets/index.js')
  const jsSrc = panel.webview.asWebviewUri(jsPath);
  panel.webview.html = getWebviewContent(cssSrc, jsSrc);

}

exports.displayWebview = displayWebview;