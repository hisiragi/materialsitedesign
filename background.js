// 拡張機能がインストールされた時の初期設定
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    isExtensionEnabled: true,
    enabledSites: {
      'chatgpt.com': true,
      'open.spotify.com': true,
      'kakaku.com': true,
      'github.com': true,
      'youtube.com': true,
      'google.com': true,
      'bing.com': true,
      'yahoo.co.jp': true,
      'news.yahoo.co.jp': true
    }
  });
});

// 拡張機能アイコンクリック時のポップアップ表示制御
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get('isExtensionEnabled', (data) => {
    const newState = !data.isExtensionEnabled;
    chrome.storage.sync.set({ isExtensionEnabled: newState }, () => {
      // アイコンの状態を更新
      chrome.action.setIcon({
        path: newState ? {
          "16": "icons/icon16.png",
          "48": "icons/icon48.png",
          "128": "icons/icon128.png"
        } : {
          "16": "icons/icon16_disabled.png",
          "48": "icons/icon48_disabled.png",
          "128": "icons/icon128_disabled.png"
        }
      });

      // 現在のタブをリロード
      chrome.tabs.reload(tab.id);
    });
  });
});
