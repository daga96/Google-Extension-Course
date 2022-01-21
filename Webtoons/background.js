chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    title: " Test Context Menu",
    id: "contextMenu1",
    contexts: ["page", "selection"],
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  chrome.tabs.create({
    url: `https://www.webtoons.com/en/search?keyword=${event.selectionText}`,
  });
});
