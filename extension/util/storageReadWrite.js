const reader = async (vscode, fileUri) => {
    const data = await vscode.workspace.fs.readFile(fileUri);
    const text = new TextDecoder().decode(data);
    return text
}

const readFile = async (vscode, context) => {
    const globalStorageUri = context.globalStorageUri;
    const fileUri = globalStorageUri.with({ path: `${globalStorageUri.path}/userQuestions.json` });
    try {
        await vscode.workspace.fs.stat(fileUri);
        const text = await reader(vscode, fileUri)
        return text
    } catch (error) {
        if (error.code === 'FileNotFound') {
            await writeFile(vscode, context, [])
            const text = reader(vscode, fileUri)
            return text
        }
    }

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