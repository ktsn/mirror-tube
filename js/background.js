chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'youtube.com', pathPrefix: '/watch' }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS(null, { file: 'css/transform.css' });
  chrome.tabs.executeScript(null, { file: 'js/transform.js' });
});
