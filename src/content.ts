import { correctKeyboardInput } from "dym-ar-en";

function fixEditableSelection() {
    const active = document.activeElement as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLElement
        | null;

    if (!active) return;

    // ============================
    // INPUT / TEXTAREA (undo-safe)
    // ============================
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

        // This preserves undo history
        active.setRangeText(result.corrected, start, end, "end");
        active.dispatchEvent(new Event("input", { bubbles: true }));
        return;
    }

    // ============================
    // CONTENTEDITABLE (undo-safe)
    // ============================
    if (active.isContentEditable) {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        if (selection.isCollapsed) return;

        const text = selection.toString();
        if (!text.trim() || text.trim().length < 2) return;

        const result = correctKeyboardInput(text);
        if (!result.needsCorrection) return;

        // execCommand preserves undo stack in rich editors
        document.execCommand("insertText", false, result.corrected);
    }
}

fixEditableSelection();
