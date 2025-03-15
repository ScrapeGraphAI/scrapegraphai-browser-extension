import { smartScraper, markdownify, searchScraper } from 'scrapegraph-js';
import Browser from 'webextension-polyfill';

Browser.runtime.onMessage.addListener(async (request) => {
  console.log(request);
  if (!request?.type || !request?.payload) return true;

  const { type, payload } = request;
  const { apiKey } = payload;
  let fileData, fileExtension;

  try {
    if (type === 'SMARTSCRAPER_REQUEST') {
      fileData = JSON.stringify(
        await smartScraper(apiKey, payload.targetUrl, payload.scrapingPrompt),
        null,
        2
      );
      fileExtension = 'json';
    } else if (type === 'MARKDOWNIFY_REQUEST') {
      fileData = (await markdownify(apiKey, payload.targetUrl)).result;
      fileExtension = 'md';
    } else if (type === 'SEARCHSCRAPER_REQUEST') {
      fileData = JSON.stringify(await searchScraper(apiKey, payload.scrapingPrompt), null, 2);
      fileExtension = 'json';
    } else {
      return true;
    }

    const fileName = generateFileName(fileExtension, payload.targetUrl);
    await downloadFile(fileData, fileName, type);
    sendNotification('Success!', 'Download successful! Your file is ready.');
    return { success: true };
  } catch (error) {
    sendNotification('Something Went Wrong', error.message);
    return { success: false, error: error.message };
  }
});

function sendNotification(title, message) {
  Browser.notifications.create(null, {
    type: 'basic',
    iconUrl: './public/icons/icon128.png',
    message,
    title,
  });
}

async function downloadFile(fileData, fileName, requestType) {
  const isChromium = typeof URL.createObjectURL === 'undefined';
  let dataUrl = null;
  if (isChromium) {
    dataUrl =
      requestType === 'MARKDOWNIFY_REQUEST'
        ? getDataUrl(fileData, 'text/markdown')
        : getDataUrl(fileData, 'application/json');
  } else {
    dataUrl =
      requestType === 'MARKDOWNIFY_REQUEST'
        ? getBlobUrl(fileData, 'text/markdown')
        : getBlobUrl(fileData, 'application/json');
  }

  try {
    await Browser.downloads.download({
      url: dataUrl,
      filename: fileName,
    });
  } finally {
    if (!isChromium) URL.revokeObjectURL(dataUrl);
  }
}

function getBlobUrl(data, type) {
  return URL.createObjectURL(new Blob([data], { type }));
}

function getDataUrl(data, type) {
  return `data:${type};charset=utf-8,${encodeURIComponent(data)}`;
}

function generateFileName(extension, url) {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  if (!url) return `scraped-data_SearchScrapeModel_${date}_${hours}-${minutes}.${extension}`;

  const hostname = new URL(url).hostname.split('.').slice(0, -1).join('-');
  return `scraped-data_${hostname}_${date}_${hours}-${minutes}.${extension}`;
}
