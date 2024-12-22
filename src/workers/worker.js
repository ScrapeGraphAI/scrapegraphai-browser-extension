import { smartScraper } from 'scrapegraph-js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SCRAPE_REQUEST') {
    handleScrapeRequest(request.payload)
      .then((response) => {
        sendNotification('Success!', 'Download successful! Your file is ready.');
        sendResponse({ success: true, data: response });
      })
      .catch((error) => {
        try {
          sendNotification('Something Went Wrong', error.message);
          sendResponse({ success: false, error: error });
        } catch (e) {
          console.log(e);
        }
      });
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

  chrome.notifications.create(null, notificationOption);
}

async function handleScrapeRequest({ apiKey, targetUrl, scrapingPrompt }) {
  const data = await smartScraper(apiKey, targetUrl, scrapingPrompt);
  downloadJsonFile(data);
  return data;
}

function downloadJsonFile(data) {
  const jsonData = JSON.stringify(data, null, 2);
  const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;
  chrome.downloads.download({ url: dataUrl, filename: 'scraped_data.json' });
}
