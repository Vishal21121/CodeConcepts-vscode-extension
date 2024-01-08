class ChoosenLanguageProvider {
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

class Language {
    constructor(label) {
        this.label = label;
    }
}

module.exports = ChoosenLanguageProvider;
