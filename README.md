# Englishify / Arabicify – Arabic ⇄ English Keyboard Fix (Chrome Extension)

[![npm](https://img.shields.io/npm/v/dym-ar-en?logo=npm)](https://www.npmjs.com/package/dym-ar-en)

A Chrome extension that **Englishifies or Arabicifies text** typed with the wrong keyboard layout.  

This extension is a browser wrapper around the **dym-ar-en** keyboard-layout correction library:  
👉 https://www.npmjs.com/package/dym-ar-en

---

## What “Englishify / Arabicify” means

- **Arabicify**:  
  Convert text typed on an English keyboard into correct Arabic text  
  Example: `hgsbl ugd;l` → `السلام عليكم`

- **Englishify**:  
  Convert text typed on an Arabic keyboard into correct English text  
  Example: `اثممخ` → `hello`

---

## How to use

1. Select text inside an **input**, **textarea**, or **editable field**
2. Right-click
3. Choose **Englishify ↔ Arabicify selected text**

The selected text is replaced with its Englishified or Arabicified version.

---

## Where it works

- Input fields  
- Textareas  
- Chat boxes and editors (`contenteditable`)

The context menu **does not appear** on static page text (articles, paragraphs, headings).

---

## How it works

- Uses the **dym-ar-en** library to:
  - Detect wrong keyboard layout
  - Convert Arabic ⇄ English keyboard mappings
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

The keyboard conversion logic is implemented in the dym-ar-en npm package:

[dym-ar-en](https://www.npmjs.com/package/dym-ar-en)

You can use the npm package directly if you need Englishify / Arabicify behavior in Node.js or web apps.

## Chrome Extension

This extension is a browser wrapper around the dym-ar-en keyboard-layout correction library:

## License

MIT