import React, { useState, useEffect } from 'react';
import Alert from '../components/ui/Alert.jsx';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeSlash, ApiKey } from 'flowbite-react-icons/outline';
import useAlert from '../hooks/useAlert.js';
import useApiKey from '../hooks/useApiKey.js';
import CreditsInfo from '../components/CreditsInfo.jsx';

const Settings = () => {
  const [toggleInputType, setToggleInputType] = useState(false);

  const { alert, showAlert, hideAlert } = useAlert();
  const { apiKey, setApiKey, saveApiKey, apiKeyError } = useApiKey();

  useEffect(() => {
    if (apiKeyError) showAlert('error', apiKeyError, false);
  }, [apiKeyError, apiKey]);

  const handleApiKeyChange = (event) => setApiKey(event.target.value);

  const handleSave = async () => {
    await saveApiKey(apiKey);
    showAlert('success', 'Settings saved successfully!');
  };

  return (
    <div className="p-6">
      <Link to="/">
        <button
          type="button"
          className="text-gray-600 p-0 mb-2 inline-flex items-center hover:text-gray-400 font-bold rounded-lg text-sm text-center">
          <ArrowLeft />
          <span>Turn back</span>
        </button>
      </Link>

      <hr className="mb-4" />

      {alert.visible && (
        <Alert
          alertType={alert.type}
          message={alert.message}
          closeable={alert.closeable}
          onClose={hideAlert}
        />
      )}

      {!apiKeyError && apiKey && (
        <div className="mb-4">
          <CreditsInfo />
        </div>
      )}

      {/* API key input */}
      <label htmlFor="api-key" className="block mb-2 text-sm font-bold text-gray-900">
        Set your API key
      </label>
      <div className="flex mb-2">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-md border-gray-300">
          <ApiKey />
        </span>
        <div className="relative w-full">
          <input
            type={toggleInputType ? 'text' : 'password'}
            value={apiKey}
            onChange={handleApiKeyChange}
            id="api-key"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
            placeholder="Enter your ScrapeGraphAI API Key"
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            onClick={() => setToggleInputType(!toggleInputType)}>
            {toggleInputType ? (
              <EyeSlash className=" text-gray-500  hover:text-gray-900" />
            ) : (
              <Eye className=" text-gray-500  hover:text-gray-900" />
            )}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Save
      </button>
    </div>
  );
};

export default Settings;
