// GitHub用の機能を実装
const githubHandler = {
  init() {
    this.initializeTranslator();
    this.setupMutationObserver();
    this.translateCurrentPage();
  },

  async initializeTranslator() {
    // 翻訳辞書のロード
    this.dictionary = await this.loadTranslationDictionary();
  },

  setupMutationObserver() {
    // DOMの変更を監視して動的に追加される要素も翻訳
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          this.translateNodes(mutation.addedNodes);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  async loadTranslationDictionary() {
    // 基本的な翻訳辞書
    return {
      "Home": "ホーム",
      "Repository": "リポジトリ",
      "Settings": "設定",
      "Pull requests": "プルリクエスト",
      "Issues": "イシュー",
      "Projects": "プロジェクト",
      "Create a new repository": "新規リポジトリの作成",
      "Import repository": "リポジトリのインポート",
      // ... 他の翻訳エントリ
    };
  },

  translateCurrentPage() {
    // 現在のページの要素を翻訳
    this.translateNodes([document.body]);
  },

  translateNodes(nodes) {
    nodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        this.translateElement(node);
      }
    });
  },

  translateElement(element) {
    // テキストノードの翻訳
    if (element.childNodes) {
      element.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
          const translated = this.translateText(child.textContent.trim());
          if (translated !== child.textContent.trim()) {
            child.textContent = child.textContent.replace(child.textContent.trim(), translated);
          }
        }
      });
    }

    // 属性の翻訳
    ['placeholder', 'title', 'alt'].forEach(attr => {
      if (element.hasAttribute(attr)) {
        const translated = this.translateText(element.getAttribute(attr));
        if (translated !== element.getAttribute(attr)) {
          element.setAttribute(attr, translated);
        }
      }
    });
  },

  translateText(text) {
    return this.dictionary[text] || text;
  }
};

githubHandler.init();
