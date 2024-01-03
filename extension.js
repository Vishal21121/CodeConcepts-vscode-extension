// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { displayWebview } = require('./components/webview/questionDisplay')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscodeextension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.window.showInformationMessage("Hey there! Are you ready for a challenge? Let's dive into some Java problems together!", "Solve Now", "Later").then((selection) => {
		if (selection === "Solve Now") {
			displayWebview(context, "Java")
		} else {
			vscode.window.showInformationMessage("Okay! See you later!");
		}
	});

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
