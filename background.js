chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "fix-ar-en",
        title: "Englishify ↔ Arabicify selected text",
        contexts: ["editable"] // ONLY editable fields
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["dist/content.js"]
    });
});
