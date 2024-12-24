# 🕷️ ScrapeGraphAI Chrome extension

The official extension for Chromium-based browsers, such as Chrome, Opera, Brave, and others."

![demo](assets/demo.gif)

## Installation

You can install the extension in two ways:

### Option 1: Using the ZIP file

1. Download the latest release ZIP file
2. Unzip the file in your desired directory
3. Open your Chromium-based browser and go to the extensions page (`chrome://extensions/`)
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the unzipped directory

### Option 2: Building from source

1. Clone the repository
2. Install dependencies:
```bash
npm i
```
3. Build the extension:
```bash
npm run build
```
   Or create a ZIP file:
```bash
npm run zip
```
4. Load the extension:
   - Go to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `dist` folder

## Usage

TODO

## Debugging

For development and debugging:

### Install dependencies

```bash
npm i
```

### Build extension

```bash
npm run build
```

### Load extension on browser

After building the extension, a `dist` folder will be generated in the root of the project. To load the extension in browser for testing, follow [this guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) and select the `dist` folder.
