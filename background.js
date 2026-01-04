chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "fix-ar-en",
        title: "Did You Mean? Arabic ⇄ English",
        contexts: ["editable"] // ONLY editable fields
    });
});

chrome.contextMenus.onClicked.addListener(async (_, tab) => {
    if (!tab?.id) return;

    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["dist/content.js"]
        });
    } catch (err) {
        console.error("DYM injection failed", err);
    }
});
