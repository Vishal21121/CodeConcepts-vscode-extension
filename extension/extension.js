// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { displayWebview, getWebviewContent, pathObject } = require('./components/webview/questionDisplay')
const { ChoosenLanguageProvider, AvailableLanguageProvider } = require('./util/languageProvider');
const selectRandomElement = require('./util/randomLangPicker');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	//* we can use the below code to save some key value pair
	let availableLanguages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Php', 'cpp', 'go'];
	let choosenLanguages = [];

	// if globalState is empty, then we will set choosenLanguages to empty array
	if (!context.globalState.get('choosenLanguages')) {
		context.globalState.update('choosenLanguages', choosenLanguages);
	}
	// else {
	// 	context.globalState.update('choosenLanguages', context.globalState.get('choosenLanguages'));
	// }
	context.globalState.update('availableLanguages', availableLanguages);
	let languages = context.globalState.get('choosenLanguages');

	// creating this for the tree view of choosen languages
	let choosenLanguageProvider = new ChoosenLanguageProvider(languages);
	vscode.window.registerTreeDataProvider('choosenLanguage', choosenLanguageProvider);

	// creating this for the tree view of available languages
	let availableLanguageProvider = new AvailableLanguageProvider(availableLanguages);
	vscode.window.registerTreeDataProvider('availableLanguages', availableLanguageProvider);


	// registering the deleteCommand
	const commandHandler = ({ label: value }) => {
		choosenLanguageProvider.languages = context.globalState.get('choosenLanguages').filter(lang => lang !== value);
		context.globalState.update('choosenLanguages', choosenLanguageProvider.languages);
		choosenLanguageProvider.refresh()
	};
	const command = 'vscodeextension.deleteLang';
	context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler))

	// registering the addCommand for adding languages to choosenLanguages
	const addCommandHandler = ({ label: value }) => {
		choosenLanguageProvider.languages = [...context.globalState.get('choosenLanguages'), value];
		context.globalState.update('choosenLanguages', choosenLanguageProvider.languages);
		choosenLanguageProvider.refresh()
	}
	const addCommand = 'vscodeextension.addLang';
	context.subscriptions.push(vscode.commands.registerCommand(addCommand, addCommandHandler))

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscodeextension" is now active!');

	// picking a random language from the choosenLanguages
	const pickedLang = selectRandomElement(context.globalState.get('choosenLanguages'));
	context.globalState.update('pickedLang', pickedLang);


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	setTimeout(() => {
		vscode.window.showInformationMessage(`Hey there! Are you ready for a challenge? Let's dive into some ${pickedLang} concept together!`, "Explore Now", "Later").then(async (selection) => {
			if (selection === "Explore Now") {
				const panel = displayWebview(context, pickedLang)
				panel.webview.postMessage({ lang: pickedLang });
				console.log("panel", panel)
			} else {
				vscode.window.showInformationMessage("Okay! See you later!");
			}
		});
	}, 10000)

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
