import React from 'react';
import PropTypes from 'prop-types';
import TextField from './ui/TextField.jsx';

const UrlSelector = ({ urlOption, setUrlOption, currentTabUrl, customUrl, setCustomUrl, customUrlError }) => {
  const handleUrlOptionChange = (event) => {
    setUrlOption(event.target.value);
  };

  return (
    <>
      <label htmlFor="url-options" className="block mb-2 text-sm font-bold text-gray-900">
        Select website URL
      </label>
      <ul
        className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
        id="url-options">
        <li className="w-full border-b border-gray-200">
          <div className="flex items-center ps-3 py-1">
            <input
              id="current-tab-url"
              type="radio"
              value="autoWebsiteUrl"
              name="url-options"
              checked={urlOption === 'autoWebsiteUrl'}
              onChange={handleUrlOptionChange}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
            />
            <div>
              <label htmlFor="current-tab-url" className="w-full ms-2 text-sm font-medium text-gray-900">
                Use current tab URL
              </label>
              <p className="text-xs ms-2 font-normal text-gray-500">
                {currentTabUrl.length > 40
                  ? currentTabUrl.slice(0, 40) + '...'
                  : currentTabUrl || 'Loading...'}
              </p>
            </div>
          </div>
        </li>
        <li className="w-full">
          <div className="flex items-center ps-3">
            <input
              id="custom-url"
              type="radio"
              value="customWebsiteUrl"
              name="url-options"
              checked={urlOption === 'customWebsiteUrl'}
              onChange={handleUrlOptionChange}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="custom-url" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
              Use custom URL
            </label>
          </div>
          {urlOption === 'customWebsiteUrl' && (
            <div className="px-5 pb-5">
              <TextField
                type="url"
                value={customUrl}
                onChange={setCustomUrl}
                placeholder="https://example.com"
                onError={customUrlError}
                onErrorMessage="Please enter a valid URL!"
              />
            </div>
          )}
        </li>
      </ul>
    </>
  );
};

UrlSelector.propTypes = {
  urlOption: PropTypes.string.isRequired,
  setUrlOption: PropTypes.func.isRequired,
  currentTabUrl: PropTypes.string.isRequired,
  customUrl: PropTypes.string.isRequired,
  setCustomUrl: PropTypes.func.isRequired,
  customUrlError: PropTypes.bool.isRequired,
};

export default UrlSelector;
