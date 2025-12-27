# Did You Mean – Arabic ⇄ English Keyboard Fix (Chrome Extension)

[![npm](https://img.shields.io/npm/v/dym-ar-en?logo=npm)](https://www.npmjs.com/package/dym-ar-en)

A Chrome extension that helps correct text typed with the wrong Arabic or English keyboard layout.  

This extension is a browser wrapper around the **dym-ar-en** keyboard-layout correction library:  
👉 https://www.npmjs.com/package/dym-ar-en

---

## What it does

If you type text in the wrong keyboard language, this extension lets you quickly correct it.  

Example:  
- Typing on English keyboard while meaning Arabic: `hgsbl ugd;l` → Corrected to: `السلام عليكم`  
- Typing on Arabic keyboard while meaning English: `اثممخ` → Corrected to: `hello`

It works like **“Did you mean …?”** for your typed text.

---

## How to use

1. Select text inside an **input**, **textarea**, or **editable field**  
2. Right-click  
3. Choose **Did you mean …?** to apply the correction

The selected text is replaced with the corrected version suggested by `dym-ar-en`.

---

## Where it works

- Input fields  
- Textareas  
- Chat boxes and editors (`contenteditable`)

The context menu **does not appear** on static page text (articles, paragraphs, headings).

---

## How it works

- Uses the **dym-ar-en** library to:
  - Detect text typed in the wrong keyboard layout
  - Convert between Arabic ⇄ English layouts
- Runs **entirely locally**
- No network requests
- No tracking or analytics

---

## Privacy

This extension does **not** collect, store, or transmit any user data.  
All processing happens locally in the browser.

---

## Development

Install dependencies:

```bash
npm install
```

Build the extension:

```bash
npm run build
```

Load the extension in Chrome:

```bash
chrome://extensions → Developer Mode → Load unpacked
```

## Core Engine

The keyboard correction logic is implemented in the dym-ar-en npm package:
https://www.npmjs.com/package/dym-ar-en

Use the npm package directly if you want to implement “Did you mean …?” style corrections in Node.js or web apps.

---

## License

MIT 