import React, { useState, useEffect } from 'react';
import UrlSelector from '../components/UrlSelector.jsx';
import Browser from 'webextension-polyfill';
import TextArea from '../components/ui/TextArea.jsx';
import Alert from '../components/ui/Alert.jsx';
import Loading from '../components/ui/Loading.jsx';
import ModelSelector from '../components/ModelSelector.jsx';
import useApiKey from '../hooks/useApiKey.js';
import useAlert from '../hooks/useAlert.js';

const Home = () => {
  const [scrapingPrompt, setScrapingPrompt] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [urlOption, setUrlOption] = useState('autoWebsiteUrl');
  const [scrapingPromptError, setScrapingPromptError] = useState(false);
  const [customUrlError, setCustomUrlError] = useState(false);
  const [isScrapeButtonDisabled, setScrapeButtonDisabled] = useState(false);
  const [currentTabUrl, setCurrentTabUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('smartScraper');

  const { alert, showAlert, hideAlert } = useAlert();
  const { apiKey, apiKeyError } = useApiKey();

  useEffect(() => {
    if (apiKeyError) {
      showAlert('error', apiKeyError, false);
      setScrapeButtonDisabled(true);
    } else {
      setScrapeButtonDisabled(false);
    }

    fetchActiveTabUrl();
  }, [apiKeyError]);

  const fetchActiveTabUrl = async () => {
    const [activeTab] = await Browser.tabs.query({ active: true, currentWindow: true });
    setCurrentTabUrl(activeTab?.url || '');
  };

  const handleScrapingPromptChange = (event) => {
    setScrapingPrompt(event.target.value);
    setScrapingPromptError(!event.target.value.trim());
  };

  const handleCustomUrlChange = (event) => {
    setCustomUrl(event.target.value);
    setCustomUrlError(!event.target.value.trim());
  };

  const handleScrapeRequest = async () => {
    if (selectedModel === 'smartScraper' || selectedModel === 'searchScraper') {
      if (!scrapingPrompt.trim()) {
        setScrapingPromptError(true);
        return;
      }
    }
    const targetUrl = urlOption === 'autoWebsiteUrl' ? currentTabUrl : customUrl;
    if (!targetUrl.trim()) {
      setCustomUrlError(true);
      return;
    }

    try {
      setIsLoading(true);
      const message = createScrapeMessage(selectedModel, targetUrl);
      console.log(message);
      const response = await Browser.runtime.sendMessage(message);
      setIsLoading(false);
      if (response.success) {
        showAlert('success', 'Your request was successfully processed!', true);
      } else {
        showAlert('error', 'An error occurred during the request.', true);
      }
    } catch (error) {
      console.error('Error during request:', error);
      setIsLoading(false);
      showAlert('error', 'An error occurred during the request.', true);
    }
  };

  const createScrapeMessage = (model, targetUrl) => {
    switch (model) {
      case 'smartScraper':
        return {
          type: 'SMARTSCRAPER_REQUEST',
          payload: {
            apiKey,
            targetUrl,
            scrapingPrompt,
          },
        };
      case 'markdownify':
        return {
          type: 'MARKDOWNIFY_REQUEST',
          payload: { apiKey, targetUrl },
        };
      case 'searchScraper':
        return {
          type: 'SEARCHSCRAPER_REQUEST',
          payload: { apiKey, scrapingPrompt },
        };
      default:
        throw new Error('Invalid scraping model selected.');
    }
  };

  return (
    <div className="p-6">
      {alert.visible && (
        <Alert
          alertType={alert.type}
          message={alert.message}
          closeable={alert.closeable}
          onClose={hideAlert}
        />
      )}

      <div className="mb-4">
        <ModelSelector value={selectedModel} onChange={setSelectedModel} />
      </div>

      {(selectedModel === 'smartScraper' || selectedModel === 'markdownify') && (
        <div className="mb-4">
          <UrlSelector
            urlOption={urlOption}
            setUrlOption={setUrlOption}
            currentTabUrl={currentTabUrl}
            customUrl={customUrl}
            setCustomUrl={handleCustomUrlChange}
            customUrlError={customUrlError}
          />
        </div>
      )}

      {(selectedModel === 'smartScraper' || selectedModel === 'searchScraper') && (
        <div className="mb-4">
          <TextArea
            value={scrapingPrompt}
            label="Describe what to scrape"
            onChange={handleScrapingPromptChange}
            rows={4}
            placeholder="Enter scraping instructions..."
            onError={scrapingPromptError}
            onErrorMessage="This field is required."
          />
        </div>
      )}

      {isLoading && <Loading />}

      <button
        onClick={handleScrapeRequest}
        type="button"
        className="text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled={isScrapeButtonDisabled}>
        Scrape
      </button>
    </div>
  );
};

export default Home;
