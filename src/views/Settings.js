import React, { useState, useEffect } from 'react';
import CloseableSuccessAlert from '../components/alerts/CloseableSuccessAlert.js';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [toggleInputType, setToggleInputType] = useState('password');
  const [isVisible, setIsVisible] = useState(false);
  const [alert, setAlert] = useState({ type: '', visible: false });

  useEffect(() => {
    chrome.storage.sync.get('api_key', ({ api_key }) => {
      if (api_key) setApiKey(api_key);
    });
  }, []);

  const handleApyKeyVisibility = (newVisibility) => {
    setToggleInputType(newVisibility ? 'text' : 'password');
    setIsVisible(newVisibility);
  };

  const handleApiKeyChange = (event) => setApiKey(event.target.value);

  const saveSettings = () => {
    chrome.storage.sync.set({ api_key: apiKey });
    setAlert({ type: 'settingsSaved', visible: true });
  };

  return (
    <div className="p-6">
      <Link to="/">
        <button
          type="button"
          className="text-gray-600 p-0 mb-6 inline-flex items-center hover:text-gray-400 font-bold rounded-lg text-sm text-center">
          <svg
            className="w-6 h-6 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
          <span>Turn back</span>
        </button>
      </Link>

      {alert.visible && alert.type === 'settingsSaved' && (
        <CloseableSuccessAlert
          onClose={() => setAlert({ ...alert, visible: false })}
          message="Settings saved successfully!"
        />
      )}

      {/* API key input */}
      <label htmlFor="api-key" className="block mb-2 text-sm font-bold text-gray-900">
        Set your API key
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-md border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
        </span>
        <div className="relative w-full">
          <input
            type={toggleInputType}
            value={apiKey}
            onChange={handleApiKeyChange}
            id="api-key"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
            placeholder="Enter your ScrapeGraphAI API Key"
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            onClick={() => handleApyKeyVisibility(!isVisible)}>
            {isVisible ? (
              <svg
                className="w-6 h-6 text-gray-500  hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6  text-gray-500  hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={saveSettings}
        className="text-white mt-4 bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Save
      </button>
    </div>
  );
};

export default Settings;
