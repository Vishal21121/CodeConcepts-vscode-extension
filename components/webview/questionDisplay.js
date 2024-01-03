const vscode = require('vscode');

function getWebviewContent(uri) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./components//webview/questionDisplayStyle.css">
        <title>Document</title>
    </head>
    
    <body>
        <div class="container">
            <div class="question">div with some text</div>
            <div class="circles">
                <div>
                    <input type="radio" id="circle1" name="circle" value="1">
                    <label for="circle1"></label>
                </div>
                <div>
                    <input type="radio" id="circle2" name="circle" value="2">
                    <label for="circle2"></label>
                </div>
                <div>
                    <input type="radio" id="circle3" name="circle" value="3">
                    <label for="circl3"></label>
                </div>
                <div>
                    <input type="radio" id="circle4" name="circle" value="4">
                    <label for="circle4"></label>
                </div>
            </div>
            <div class="message">congrats/error message</div>
        </div>
    </body>
    
    </html>`
}

function displayWebview(context, lang) {
    console.log("displaying webview")
    const panel = vscode.window.createWebviewPanel(
        'questionDisplay',
        `Question of ${lang}`,
        vscode.ViewColumn.One,
        {
            enableScripts: true
        }
    );
    const cssPath = vscode.Uri.joinPath(context.extensionUri, 'components/webview/questionDisplayStyle.css')
    const cssSrc = panel.webview.asWebviewUri(cssPath);
    panel.webview.html = getWebviewContent(cssSrc);

}

exports.displayWebview = displayWebview;