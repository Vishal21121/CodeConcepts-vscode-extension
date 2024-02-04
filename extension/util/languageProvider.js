const vscode = require('vscode');

class ChoosenLanguageProvider {
    constructor(languages) {
        this.languages = languages;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }


    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (element) {
            return Promise.resolve([]);
        } else {
            return Promise.resolve(this.languages.map(lang => new Language(lang)));
        }
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }
}

class Language {
    constructor(label) {
        this.label = label;
    }
}

class AvailableLanguageProvider {
    constructor(languages) {
        this.languages = languages;
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (element) {
            return Promise.resolve([]);
        } else {
            return Promise.resolve(this.languages.map(lang => new Language(lang)));
        }
    }

}

module.exports = { ChoosenLanguageProvider, AvailableLanguageProvider };
