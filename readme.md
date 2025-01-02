# 🕷️ ScrapeGraphAI Chrome extension

The official extension for Chromium-based browsers, such as Chrome, Opera, Brave, and others, as well as Firefox.

![demo](assets/demo.gif)

## Installation

You can install the extension using one of these methods:

### 1. Browser Extension Stores (Recommended)

#### Chrome and Chromium-based browsers
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) (coming soon)
2. Search for "ScrapeGraphAI"
3. Click "Add to Chrome"

#### Firefox
1. Visit the [Firefox Add-ons Store](https://addons.mozilla.org/en-GB/firefox/addon/scrapegraphai-extension/)
2. Click "Add to Firefox"
3. Follow the installation prompts

Watch our [video tutorial](https://www.youtube.com/watch?v=tSy8udRu1lA) for a step-by-step guide on Firefox installation.

### 2. Manual Installation (Development Build)

1. Download the latest `scrapegraphai_extension.zip` from the [Releases page](https://github.com/yourusername/scrapegraphai-chrome/releases)
2. Extract the ZIP file to a folder on your computer
3. For Chrome/Chromium browsers:
   - Go to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top-right corner
   - Click "Load unpacked"
   - Select the extracted folder
4. For Firefox:
   - Go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the extracted folder

### 3. Building from Source

If you want to build the extension from source:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scrapegraphai-chrome.git
cd scrapegraphai-chrome
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build:chromium    # For Chrome/Chromium browsers
# or
npm run build:firefox     # For Firefox browser
```

4. The built extension will be in the `dist` folder
5. Load it in your browser following the steps from Manual Installation section

## Usage

1. **Setup**
   - After installing the extension, click on its icon in your browser's toolbar
   - Go to Settings and enter your ScrapeGraphAI API key
   - If you don't have an API key, get one from [ScrapeGraphAI website]

2. **Basic Usage**
   - Navigate to any webpage you want to scrape
   - Click the extension icon
   - Enter your scraping instructions in the text field
   - Click "Scrape" to start the process

3. **Advanced Options**
   - Use "Custom URL" if you want to scrape a different page than the current one
   - The extension will notify you when the scraping is complete
   - Check your ScrapeGraphAI dashboard for the scraped data

4. **Tips**
   - Be specific in your scraping instructions
   - Make sure you have a valid API key
   - Check the extension's status indicators for any errors

## Debugging

For development and debugging:

### Install dependencies

```bash
npm i
```

### Build extension

```bash
npm run build:chromium
```

### Load extension on browser

After building the extension, a `dist` folder will be generated in the root of the project. To load the extension in browser for testing, follow [this guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) and select the `dist` folder.
