import { correctKeyboardInput } from "dym-ar-en";

const MAX_PREVIEW_LENGTH = 35;

chrome.runtime.onInstalled.addListener(() => {
    // Placeholder parent menu
    chrome.contextMenus.create({
        id: "dym-root",
        title: "Did you mean …?",
        contexts: ["editable"],
    });
});

// Update menu dynamically when shown
chrome.contextMenus.onShown.addListener(({ selectionText }) => {
    chrome.contextMenus.removeAll(() => {
        if (!selectionText || selectionText.trim().length < 2) return;

        const previewText = selectionText.length > MAX_PREVIEW_LENGTH
            ? selectionText.slice(0, MAX_PREVIEW_LENGTH) + "..."
            : selectionText;

        // Call content script function to check correction
        chrome.scripting.executeScript(
            {
                target: { allFrames: false }, func: (text) => {
                    return window.dymArEn.correctKeyboardInput(text);
                }, args: [selectionText]
            },
            (results) => {
                const result = results?.[0]?.result;
                if (!result || !result.needsCorrection) return;

                // Parent menu
                chrome.contextMenus.create({
                    id: "dym-root",
                    title: `Did you mean: "${previewText}"`,
                    contexts: ["editable"],
                });

                // Apply suggestion submenu
                chrome.contextMenus.create({
                    id: "dym-apply",
                    parentId: "dym-root",
                    title: `Apply: "${result.corrected.slice(0, MAX_PREVIEW_LENGTH)}${result.corrected.length > MAX_PREVIEW_LENGTH ? "..." : ""}"`,
                    contexts: ["editable"],
                });

                // Preview submenu for long selections
                if (selectionText.length > 40) {
                    chrome.contextMenus.create({
                        id: "dym-preview",
                        parentId: "dym-root",
                        title: "Preview correction",
                        contexts: ["editable"],
                    });
                }

                chrome.contextMenus.refresh();
            }
        );
    });
});

// Handle menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        functionName: "handleDymClick",
        args: [info.menuItemId],
        files: ["dist/content.js"],
    });
});
