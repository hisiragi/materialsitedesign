// YouTube用の機能を実装
const youtubeHandler = {
  init() {
    // 他の拡張機能との競合を防ぐ
    this.removeConflictingExtensions();
    this.applyCustomStyles();
  },

  removeConflictingExtensions() {
    // 既存の拡張機能のスタイルやスクリプトを無効化
    const existingStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
    existingStyles.forEach(style => {
      if (style.innerHTML.includes('extension') || style.href?.includes('extension')) {
        style.disabled = true;
      }
    });
  },

  applyCustomStyles() {
    // カスタムスタイルの適用
    document.documentElement.classList.add('material-design-youtube');
  }
};

youtubeHandler.init();
