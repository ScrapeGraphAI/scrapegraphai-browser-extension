import { useState, useEffect } from 'react';
import Browser from 'webextension-polyfill';

const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { api_key } = await Browser.storage.local.get('api_key');
        setApiKey(api_key || '');
        if (!api_key) setApiKeyError('No API key found, please set the API key.');
      } catch (error) {
        console.error('Error fetching API key:', error);
        setApiKeyError('Failed to retrieve API key.');
      }
    };

    fetchApiKey();
  }, []);

  const saveApiKey = async (newApiKey) => {
    try {
      await Browser.storage.local.set({ api_key: newApiKey });
      setApiKey(newApiKey);
      setApiKeyError(null);
    } catch (error) {
      console.error('Error saving API key:', error);
      setApiKeyError('Failed to save API key.');
    }
  };

  return { apiKey, setApiKey, saveApiKey, apiKeyError };
};

export default useApiKey;
