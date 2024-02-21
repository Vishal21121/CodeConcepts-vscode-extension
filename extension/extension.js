// The module 'vscode' contains the VS Code extensibility API

// @ts-check

const { randomUUID } = require("crypto");

// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { displayWebview } = require("./components/webview/questionDisplay");
const {
	ChoosenLanguageProvider,
	AvailableLanguageProvider,
} = require("./util/languageProvider");
const selectRandomElement = require("./util/randomLangPicker");
const {
	displayUserSavedQuestionWebview,
} = require("./components/webview/userSavedQuestionDisplay");
const { readFile, writeFile } = require("./util/storageReadWrite");
const { displayblogsWebview } = require("./components/webview/displayBlog");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	//* we can use the below code to save some key value pair
	let availableLanguages = [
		"JavaScript",
		"Rust",
		"Python",
		"Java",
		"PHP",
		"cpp",
		"GO",
		"SQL",
	];
	let choosenLanguages = [];

	// if globalState is empty, then we will set choosenLanguages to empty array
	if (!context.globalState.get("choosenLanguages")) {
		context.globalState.update("choosenLanguages", choosenLanguages);
	}
	// else {
	// 	context.globalState.update('choosenLanguages', context.globalState.get('choosenLanguages'));
	// }
	context.globalState.update("availableLanguages", availableLanguages);
	let languages = context.globalState.get("choosenLanguages");

	// creating this for the tree view of choosen languages
	let choosenLanguageProvider = new ChoosenLanguageProvider(languages);
	vscode.window.registerTreeDataProvider(
		"choosenLanguage",
		choosenLanguageProvider
	);

	// creating this for the tree view of available languages
	let availableLanguageProvider = new AvailableLanguageProvider(
		availableLanguages
	);
	vscode.window.registerTreeDataProvider(
		"availableLanguages",
		availableLanguageProvider
	);

	// registering the deleteCommand
	const commandHandler = ({ label: value }) => {
		choosenLanguageProvider.languages = context.globalState
			.get("choosenLanguages")
			.filter((lang) => lang !== value);
		context.globalState.update(
			"choosenLanguages",
			choosenLanguageProvider.languages
		);
		choosenLanguageProvider.refresh();
	};
	const command = "vscodeextension.deleteLang";
	context.subscriptions.push(
		vscode.commands.registerCommand(command, commandHandler)
	);

	// registering the addCommand for adding languages to choosenLanguages
	const addCommandHandler = ({ label: value }) => {
		if (choosenLanguageProvider.languages.includes(value))
			return vscode.window.showErrorMessage("This language is already choosen");
		choosenLanguageProvider.languages = [
			...context.globalState.get("choosenLanguages"),
			value,
		];
		context.globalState.update(
			"choosenLanguages",
			choosenLanguageProvider.languages
		);
		choosenLanguageProvider.refresh();
	};
	const addCommand = "vscodeextension.addLang";
	context.subscriptions.push(
		vscode.commands.registerCommand(addCommand, addCommandHandler)
	);

	// registering the solve more question command
	const solveMoreCommandHandler = () => {
		// if no languges are choosen then show error message
		if (context.globalState.get("choosenLanguages").length === 0)
			return vscode.window.showErrorMessage(
				"Please choose some languages to get started"
			);
		const pickedLang = selectRandomElement(
			context.globalState.get("choosenLanguages")
		);
		const panel = displayWebview(context, pickedLang);
		panel.webview.onDidReceiveMessage((message) => {
			switch (message.command) {
				case "loaded":
					panel.webview.postMessage({
						command: "langChoosen",
						lang: pickedLang,
					});
					break;
				case "server question":
					readFile(vscode, context, "serverQuestion.json").then((value) => {
						let arr = JSON.parse(value);
						console.log("arr", typeof arr);
						if (arr.length > 0) {
							console.log("Entered if");
							let index = arr.findIndex((el) => el._id == message.data._id);
							if (index == -1) {
								writeFile(vscode, context, [...arr, message.data], "serverQuestion.json");
							}
						} else {
							writeFile(vscode, context, [message.data], "serverQuestion.json");
						}
					});
					break;
				case "questionLoadError":
					readFile(vscode, context, "serverQuestion.json").then((value) => {
						let arr = JSON.parse(value);
						let randomIndex = Math.floor(Math.random() * arr.length);
						panel.webview.postMessage({
							command: "reload",
							data: arr[randomIndex]
						})
					});
			}
		});
	};
	const solveMoreCommand = "vscodeextension.solveMore";
	context.subscriptions.push(
		vscode.commands.registerCommand(solveMoreCommand, solveMoreCommandHandler)
	);

	// registering the add questions command
	const addQuestionsCommandHandler = () => {
		const panel = displayUserSavedQuestionWebview(context, "Question Form");
		panel.webview.onDidReceiveMessage((message) => {
			switch (message.command) {
				case "loaded":
					panel.webview.postMessage({
						command: "viewMode",
						data: "questionForm",
					});
					break;
				case "save question":
					// first reading the saved content and then putting the new content in the file
					if (panel.active) {
						readFile(vscode, context, "userQuestions.json").then((value) => {
							const content = message.data;
							if (content) {
								message.data.id = randomUUID();
								const data = [...JSON.parse(value), content];
								writeFile(vscode, context, data, "userQuestions.json").then(
									() => {
										vscode.window.showInformationMessage(
											"Question saved successfully!"
										);
										panel.dispose();
									}
								);
							}
						});
					}
					break;
			}
		});
	};
	const addQuestionsCommand = "vscodeextension.addQuestions";
	context.subscriptions.push(
		vscode.commands.registerCommand(
			addQuestionsCommand,
			addQuestionsCommandHandler
		)
	);

	const viewQuestionsCommandHandler = () => {
		readFile(vscode, context, "userQuestions.json").then((value) => {
			if (JSON.parse(value).length === 0) {
				return vscode.window.showErrorMessage(
					"You have not saved any questions yet!"
				);
			} else {
				const panel = displayUserSavedQuestionWebview(
					context,
					"Saved Questions"
				);
				panel.webview.onDidReceiveMessage((message) => {
					switch (message.command) {
						case "loaded":
							panel.webview.postMessage({
								command: "viewMode",
								data: "questionDisplay",
							});
							break;
						case "getQuestions":
							readFile(vscode, context, "userQuestions.json").then((value) => {
								panel.webview.postMessage({
									command: "getQuestions",
									data: JSON.parse(value),
								});
							});
							break;
						case "deleteQuestion":
							readFile(vscode, context, "userQuestions.json").then((value) => {
								let arr = JSON.parse(value).filter(
									(el) => el.id != message.data
								);
								writeFile(vscode, context, arr, "userQuestions.json").then(
									() => {
										vscode.window.showInformationMessage(
											"Question deleted successfully!"
										);
										panel.webview.postMessage({
											command: "getQuestions",
											data: arr,
										});
									}
								);
							});
							break;
						case "update question":
							panel.title = "Update Question";
							readFile(vscode, context, "userQuestions.json").then((value) => {
								let valueParsed = JSON.parse(value);
								let elementIndex = valueParsed.findIndex(
									(el) => el.id == message.data.id
								);
								valueParsed[elementIndex] = message.data;
								writeFile(
									vscode,
									context,
									valueParsed,
									"userQuestions.json"
								).then(() => {
									vscode.window.showInformationMessage(
										"Question updated successfully!"
									);
									panel.webview.postMessage({
										command: "upadateQuestion",
										data: valueParsed,
									});
									panel.title = "Saved Questions";
								});
							});
					}
				});
			}
		});
	};
	const viewQuestionsCommand = "vscodeextension.viewQuestions";
	context.subscriptions.push(
		vscode.commands.registerCommand(
			viewQuestionsCommand,
			viewQuestionsCommandHandler
		)
	);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(
		'Congratulations, your extension "vscodeextension" is now active!'
	);

	// picking a random language from the choosenLanguages
	const pickedLang = selectRandomElement(
		context.globalState.get("choosenLanguages")
	);
	context.globalState.update("pickedLang", pickedLang);

	//* BLOG SECTION

	const viewBlogCommandHandler = () => {
		const panel = displayblogsWebview(context, "Blogs", null);
		panel.webview.onDidReceiveMessage(async (message) => {
			switch (message.command) {
				case "openLink":
					try {
						const panel = displayblogsWebview(
							context,
							message.data.title,
							message.data.data
						);
					} catch (error) {
						console.log(error);
					}
					break;
				case "ready":
					panel.webview.postMessage({
						command: "choosenLanguage",
						data: context.globalState.get("choosenLanguages"),
					});
					break;
			}
		});
	};
	const viewBlogCommand = "vscodeextension.viewBlog";
	context.subscriptions.push(
		vscode.commands.registerCommand(viewBlogCommand, viewBlogCommandHandler)
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	setTimeout(() => {
		if (context.globalState.get("choosenLanguages").length === 0) {
			console.log("inside");
			return vscode.window.showInformationMessage(
				"Hey there! Please choose some languages to get started"
			);
		}
		vscode.window
			.showInformationMessage(
				`Hey there! Are you ready for a challenge? Let's dive into some ${pickedLang} concept together!`,
				"Solve Now",
				"Later"
			)
			.then(async (selection) => {
				if (selection === "Solve Now") {
					const panel = displayWebview(context, pickedLang);
					panel.webview.onDidReceiveMessage((message) => {
						switch (message.command) {
							case "loaded":
								panel.webview.postMessage({
									command: "langChoosen",
									lang: pickedLang,
								});
								break;
						}
					});
					// setTimeout(() => {
					// 	if (panel.active) {
					// 		panel.webview.postMessage({ lang: pickedLang });
					// 	} else {
					// 		setTimeout(() => {
					// 			panel.webview.postMessage({ lang: pickedLang });
					// 		}, 3000)
					// 	}
					// }, 1000)
				} else {
					vscode.window.showInformationMessage("Okay! See you later!");
				}
			});
	}, 10000);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate,
};
