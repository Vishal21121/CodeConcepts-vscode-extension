const readFile = async (vscode, context) => {
    const globalStorageUri = context.globalStorageUri;
    const fileUri = globalStorageUri.with({ path: `${globalStorageUri.path}/userQuestions.json` });
    const data = await vscode.workspace.fs.readFile(fileUri);
    const text = new TextDecoder().decode(data);
    return text
}

const writeFile = async (vscode, context, value) => {
    const globalStorageUri = context.globalStorageUri;
    const fileUri = globalStorageUri.with({ path: `${globalStorageUri.path}/userQuestions.json` });
    const data = Buffer.from(JSON.stringify(value), 'utf-8');
    await vscode.workspace.fs.writeFile(fileUri, data);
}

module.exports = {
    readFile,
    writeFile
}