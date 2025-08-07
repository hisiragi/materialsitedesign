// サイトごとの設定を取得
chrome.storage.sync.get(['enabledSites', 'isExtensionEnabled'], function(data) {
  const hostname = window.location.hostname;
  if (!data.isExtensionEnabled || !data.enabledSites?.[hostname]) {
    return;
  }

  // サイトごとの特別な処理
  switch(hostname) {
    case 'github.com':
      applyGitHubStyles();
      enableJapanese();
      break;
    case 'yahoo.co.jp':
    case 'news.yahoo.co.jp':
      applyYahooStyles();
      removeAds();
      break;
    case 'kakaku.com':
      applyKakakuStyles();
      break;
    case 'youtube.com':
      applyYouTubeStyles();
      break;
    default:
      applyDefaultStyles();
  }

  // ダークモード検出と適用
  applyThemeStyles();
});

function applyDefaultStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* マテリアルデザインの基本スタイル */
    body {
      font-family: 'Roboto', sans-serif;
    }

    button {
      border-radius: 4px;
      padding: 8px 16px;
      border: none;
      background-color: #1a73e8;
      color: white;
      transition: background-color 0.2s;
    }

    input {
      border-radius: 4px;
      border: 1px solid #dadce0;
      padding: 8px;
    }

    /* その他のマテリアルデザインスタイル */
  `;
  document.head.appendChild(style);
}

function applyThemeStyles() {
  // システムのダークモード設定を検出
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const updateTheme = (e) => {
    const isDarkMode = e.matches;
    // ダークモードに応じてスタイルを適用
    const style = document.createElement('style');
    style.textContent = isDarkMode ? getDarkThemeStyles() : getLightThemeStyles();
    document.head.appendChild(style);
  };

  darkModeMediaQuery.addListener(updateTheme);
  updateTheme(darkModeMediaQuery);
}

function getDarkThemeStyles() {
  return `
    body {
      background-color: #202124;
      color: #e8eaed;
    }
    /* その他のダークモードスタイル */
  `;
}

function getLightThemeStyles() {
  return `
    body {
      background-color: #ffffff;
      color: #202124;
    }
    /* その他のライトモードスタイル */
  `;
}

// サイト固有の関数は別ファイルに分割することを推奨
function applyGitHubStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* GitHubのマテリアルデザインスタイル */
    .Header {
      background-color: var(--md-surface) !important;
      box-shadow: var(--md-elevation-1) !important;
    }
    
    .btn {
      border-radius: 4px !important;
      transition: background-color 0.2s !important;
    }
    
    .btn-primary {
      background-color: var(--md-primary) !important;
      border-color: var(--md-primary) !important;
    }
    
    .repository-content {
      border-radius: 8px !important;
      box-shadow: var(--md-elevation-1) !important;
      padding: 16px !important;
    }
  `;
  document.head.appendChild(style);
}

function enableJapanese() {
  // GitHubの日本語化
  const translations = {
    'Pull requests': 'プルリクエスト',
    'Issues': '課題',
    'Marketplace': 'マーケット',
    'Explore': '探索',
    'Overview': '概要',
    'Repositories': 'リポジトリ',
    'Projects': 'プロジェクト',
    'Packages': 'パッケージ',
    // 他の翻訳を追加
  };

  function translateText() {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
        const text = element.textContent;
        if (translations[text]) {
          element.textContent = translations[text];
        }
      }
    });
  }

  // ページロード時と動的コンテンツの更新時に翻訳を実行
  translateText();
  const observer = new MutationObserver(translateText);
  observer.observe(document.body, { childList: true, subtree: true });
}

function applyYahooStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Yahoo!のマテリアルデザインスタイル */
    #yjmain {
      font-family: 'Roboto', sans-serif !important;
    }
    
    .yjmthloginarea {
      background-color: var(--md-surface) !important;
      box-shadow: var(--md-elevation-1) !important;
      border-radius: 8px !important;
    }
    
    .yjmthprop_list_item {
      border-radius: 4px !important;
      transition: background-color 0.2s !important;
    }
    
    /* ニュースタブのスタイル維持 */
    #yjmthmodule_news {
      margin: 16px 0 !important;
    }
    
    /* 天気タブのスタイル維持 */
    #yjmthmodule_weather {
      margin: 16px 0 !important;
    }
  `;
  document.head.appendChild(style);
}

function removeAds() {
  // 広告要素の削除
  const adSelectors = [
    '.ad_',
    '[class*="premium"]',
    '.banner',
    '#prm',
    '#ad_',
    '.promotional'
  ];
  
  function removeAdElements() {
    adSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => element.remove());
    });
  }
  
  // 定期的に広告要素を確認して削除
  removeAdElements();
  setInterval(removeAdElements, 1000);
}

function applyKakakuStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* 価格.comのマテリアルデザインスタイル */
    body {
      font-family: 'Roboto', sans-serif !important;
    }
    
    .searchBox {
      border-radius: 4px !important;
      box-shadow: var(--md-elevation-1) !important;
    }
    
    .itemPrice {
      border-radius: 8px !important;
      padding: 12px !important;
      transition: box-shadow 0.2s !important;
    }
    
    .itemPrice:hover {
      box-shadow: var(--md-elevation-2) !important;
    }
    
    /* レイアウト崩れ防止 */
    .priceList {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 16px !important;
    }
  `;
  document.head.appendChild(style);
}

function applyYouTubeStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* YouTubeのマテリアルデザインスタイル */
    /* プレーヤー以外の要素のみを対象に */
    ytd-app {
      --yt-spec-brand-background-primary: var(--md-surface) !important;
    }
    
    ytd-masthead {
      background-color: var(--md-surface) !important;
      box-shadow: var(--md-elevation-1) !important;
    }
    
    .ytd-searchbox {
      border-radius: 4px !important;
    }
    
    ytd-thumbnail {
      border-radius: 8px !important;
      overflow: hidden !important;
    }
    
    /* プレーヤーは除外 */
    .html5-video-player {
      all: revert !important;
    }
  `;
  document.head.appendChild(style);
}
