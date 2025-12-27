import { correctKeyboardInput } from "dym-ar-en";

const MIN_SELECTION_LENGTH = 2;

// Fix the selected text inside input, textarea, or contenteditable
function fixText(element: HTMLInputElement | HTMLTextAreaElement | HTMLElement, corrected: string) {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        const start = element.selectionStart || 0;
        const end = element.selectionEnd || 0;
        element.setRangeText(corrected, start, end, "end");
        return;
    }

    // contenteditable elements
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(corrected));
    }
}

// Handle clicks from background context menu
export function handleDymClick(menuId: string) {
    const el = document.activeElement as any;
    if (!el) return;

    const selection = el.value
        ? el.value.substring(el.selectionStart, el.selectionEnd)
        : window.getSelection()?.toString() || "";

    if (!selection || selection.length < MIN_SELECTION_LENGTH) return;

    const result = correctKeyboardInput(selection);
    if (!result.needsCorrection) return;

    if (menuId === "dym-apply") {
        fixText(el, result.corrected);
    } else if (menuId === "dym-preview") {
        alert(`Suggestion:\n\n${result.corrected}`);
    }
}

// Expose globally for background script calls
(window as any).handleDymClick = handleDymClick;
(window as any).dymArEn = { correctKeyboardInput };
