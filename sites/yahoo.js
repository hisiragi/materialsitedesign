// Yahoo Japan用の機能を実装
const yahooHandler = {
  init() {
    this.removeAds();
    this.preserveNewsTabs();
    this.applyMaterialDesign();
  },

  removeAds() {
    const adSelectors = [
      '.Ad',
      '[class*="ad-"]',
      '[id*="ad-"]',
      '.billboard',
      '.promo'
    ];
    
    // MutationObserverを使用して動的に追加される広告も削除
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        adSelectors.forEach(selector => {
          document.querySelectorAll(selector).forEach(ad => ad.remove());
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  preserveNewsTabs() {
    // ニュースタブの保持とスタイル調整
    const newsTabs = document.querySelectorAll('.news-tab, .topics-tab');
    newsTabs.forEach(tab => {
      tab.style.display = 'block';
      tab.classList.add('material-design-tab');
    });
  },

  applyMaterialDesign() {
    document.documentElement.classList.add('material-design-yahoo');
  }
};

yahooHandler.init();
