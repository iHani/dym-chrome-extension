import { correctKeyboardInput } from "dym-ar-en";

function fixEditableSelection() {
    const active = document.activeElement as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLElement
        | null;

    if (!active) return;

    // ✅ INPUT or TEXTAREA
    if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement
    ) {
        const start = active.selectionStart;
        const end = active.selectionEnd;

        if (start === null || end === null || start === end) return;

        const selectedText = active.value.slice(start, end);
        const result = correctKeyboardInput(selectedText);

        if (!result.needsCorrection) return;

        active.setRangeText(result.corrected, start, end, "end");
        return;
    }

    // ✅ CONTENTEDITABLE
    if (active.isContentEditable) {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const text = selection.toString();
        if (!text.trim()) return;

        const result = correctKeyboardInput(text);
        if (!result.needsCorrection) return;

        range.deleteContents();
        range.insertNode(document.createTextNode(result.corrected));
    }
}

fixEditableSelection();
