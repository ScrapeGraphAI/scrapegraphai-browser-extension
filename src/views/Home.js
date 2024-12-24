import React, { useState, useEffect } from 'react';
import ErrorAlert from '../components/alerts/ErrorAlert.js';
import CloseableErrorAlert from '../components/alerts/CloseableErrorAlert.js';
import CloseableSuccessAlert from '../components/alerts/CloseableSuccessAlert.js';
import PromptInput from '../components/PromptInput.js';
import UrlSelector from '../components/UrlSelector.js';
import Logo from '../assets/scrapegraphai_logo.svg';

const Home = () => {
  const [scrapingPrompt, setScrapingPrompt] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [urlOption, setUrlOption] = useState('autoWebsiteUrl');
  const [alert, setAlert] = useState({ type: '', visible: false });
  const [validationError, setValidationError] = useState({ scrapingPrompt: false, customUrl: false });
  const [isScrapeButtonDisabled, setScrapeButtonDisabled] = useState(false);
  const [currentTabUrl, setCurrentTabUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chrome.storage.local.get('api_key', ({ api_key }) => {
      if (api_key) {
        setApiKey(api_key);
        setScrapeButtonDisabled(false);
      } else {
        showAlert('apiKeyError');
        setScrapeButtonDisabled(true);
      }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
      setCurrentTabUrl(activeTab?.url || '');
    });
  }, []);

  const showAlert = (type) => {
    setAlert({ type, visible: true });
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  const handleScrapeRequest = async () => {
    if (!scrapingPrompt.trim()) {
      setValidationError((validationError.scrapingPrompt = true));
      return;
    }

    const targetUrl = urlOption === 'autoWebsiteUrl' ? currentTabUrl : customUrl;
    if (!targetUrl.trim()) {
      setValidationError((validationError.customUrl = true));
      return;
    }

    try {
      setIsLoading(true);
      chrome.runtime.sendMessage(
        {
          type: 'SCRAPE_REQUEST',
          payload: { apiKey, targetUrl, scrapingPrompt },
        },
        (response) => {
          setIsLoading(false);
          if (response.success) {
            showAlert('requestSuccess');
          } else {
            showAlert('requestError');
          }
        }
      );
    } catch (error) {
      console.error('Error during scraping request:', error);
      showAlert('requestError');
    }
  };

  return (
    <div className="p-6">
      {alert.visible && alert.type === 'apiKeyError' && (
        <ErrorAlert message="API Key is not set, please configure it in settings." />
      )}
      {alert.visible && alert.type === 'requestError' && (
        <CloseableErrorAlert onClose={hideAlert} message="An error occurred during the request." />
      )}
      {alert.visible && alert.type === 'requestSuccess' && (
        <CloseableSuccessAlert
          onClose={hideAlert}
          message="Your scrape request was successfully processed!"
        />
      )}

      <UrlSelector
        urlOption={urlOption}
        setUrlOption={setUrlOption}
        currentTabUrl={currentTabUrl}
        customUrl={customUrl}
        setCustomUrl={setCustomUrl}
        validationError={validationError.customUrl}
      />

      <PromptInput
        scrapingPrompt={scrapingPrompt}
        setScrapingPrompt={setScrapingPrompt}
        validationError={validationError.scrapingPrompt}
      />

      {isLoading && (
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-40">
          <img src={Logo} className="h-20 animate-spin" alt="ScrapeGraphAI-Logo" />
        </div>
      )}

      <button
        onClick={handleScrapeRequest}
        type="button"
        className="text-white mt-4 bg-green-700 disabled:bg-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled={isScrapeButtonDisabled}>
        Scrape
      </button>
    </div>
  );
};

export default Home;
