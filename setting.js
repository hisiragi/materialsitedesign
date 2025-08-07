// サイトの設定情報
const siteConfigs = [
  {
    domain: 'chatgpt.com',
    name: 'ChatGPT',
    description: 'チャットインターフェースをマテリアルデザインに'
  },
  {
    domain: 'open.spotify.com',
    name: 'Spotify',
    description: 'ミュージックプレーヤーをマテリアルデザインに'
  },
  {
    domain: 'kakaku.com',
    name: '価格.com',
    description: 'レイアウトを維持しながらマテリアルデザインを適用'
  },
  {
    domain: 'github.com',
    name: 'GitHub',
    description: 'マテリアルデザイン + 日本語化対応'
  },
  {
    domain: 'youtube.com',
    name: 'YouTube',
    description: '他の拡張機能と競合しないよう制限付きで適用'
  },
  {
    domain: 'google.com',
    name: 'Google',
    description: 'よりスッキリとした検索インターフェース'
  },
  {
    domain: 'bing.com',
    name: 'Bing',
    description: '洗練された検索インターフェース'
  },
  {
    domain: 'yahoo.co.jp',
    name: 'Yahoo! JAPAN',
    description: 'ニュース・天気タブを維持、広告を除去'
  },
  {
    domain: 'news.yahoo.co.jp',
    name: 'Yahoo!ニュース',
    description: 'ニュースサイトをマテリアルデザインに'
  }
];

// サイトリストの生成
function createSiteList() {
  const siteList = document.getElementById('siteList');
  
  chrome.storage.sync.get('enabledSites', (data) => {
    const enabledSites = data.enabledSites || {};
    
    siteConfigs.forEach(site => {
      const siteItem = document.createElement('div');
      siteItem.className = 'site-item';
      
      siteItem.innerHTML = `
        <div class="site-info">
          <div class="site-name">${site.name}</div>
          <div class="site-description">${site.description}</div>
        </div>
        <label class="switch">
          <input type="checkbox" data-domain="${site.domain}" 
            ${enabledSites[site.domain] ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
      `;
      
      siteList.appendChild(siteItem);
    });

    // イベントリスナーの設定
    setupEventListeners();
  });
}

// イベントリスナーの設定
function setupEventListeners() {
  const switches = document.querySelectorAll('input[type="checkbox"]');
  switches.forEach(switchEl => {
    switchEl.addEventListener('change', (e) => {
      const domain = e.target.dataset.domain;
      
      chrome.storage.sync.get('enabledSites', (data) => {
        const enabledSites = data.enabledSites || {};
        enabledSites[domain] = e.target.checked;
        
        chrome.storage.sync.set({ enabledSites }, () => {
          // 設定の保存完了を視覚的にフィードバック
          showSaveNotification();
        });
      });
    });
  });
}

// 保存完了通知の表示
function showSaveNotification() {
  const notification = document.createElement('div');
  notification.className = 'save-notification';
  notification.textContent = '設定を保存しました';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// 初期化
document.addEventListener('DOMContentLoaded', createSiteList);
