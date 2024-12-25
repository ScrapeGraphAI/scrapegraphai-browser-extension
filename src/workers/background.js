import { smartScraper } from 'scrapegraph-js';
import Browser from 'webextension-polyfill';

Browser.runtime.onMessage.addListener(async (request) => {
  if (request.type === 'SCRAPE_REQUEST') {
    try {
      const data = await smartScraper(
        request.payload.apiKey,
        request.payload.targetUrl,
        request.payload.scrapingPrompt
      );
      await downloadJsonFile(data);
      sendNotification('Success!', 'Download successful! Your file is ready.');
      return Promise.resolve({ success: true });
    } catch (error) {
      sendNotification('Something Went Wrong', error.message);
      return Promise.resolve({ success: false, error: error.message });
    }
  }
  return true;
});

function sendNotification(title, message) {
  const notificationOption = {
    type: 'basic',
    iconUrl: './public/icons/icon128.png',
    message: message,
    title: title,
  };
  Browser.notifications.create(null, notificationOption);
}

async function downloadJsonFile(data) {
  const jsonData = JSON.stringify(data, null, 2);
  if (typeof URL.createObjectURL === 'undefined') {
    // Chromium service worker
    const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;
    try {
      await Browser.downloads.download({
        url: dataUrl,
        filename: 'scraped_data.json',
      });
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  } else {
    // Firefox background script
    const blob = new Blob([jsonData], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);

    try {
      await Browser.downloads.download({
        url: blobUrl,
        filename: 'scraped_data.json',
      });
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  }
}
