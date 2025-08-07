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
  // GitHubのマテリアルデザインスタイル
}

function enableJapanese() {
  // GitHubの日本語化処理
}

function applyYahooStyles() {
  // Yahoo!のマテリアルデザインスタイル
}

function removeAds() {
  // 広告要素の削除
}

function applyKakakuStyles() {
  // 価格.comのマテリアルデザインスタイル
}

function applyYouTubeStyles() {
  // YouTubeのマテリアルデザインスタイル（動画プレーヤーは除外）
}
