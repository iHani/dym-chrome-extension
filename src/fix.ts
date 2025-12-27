import { correctKeyboardInput } from "dym-ar-en";

export function fixSelection() {
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
