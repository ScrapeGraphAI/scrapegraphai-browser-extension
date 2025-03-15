import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ModelSelector = ({ value, onChange }) => {
  const [selectedModel, setSelectedModel] = useState(value || 'smartScraper');

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    onChange(event.target.value);
  };

  return (
    <>
      <label htmlFor="model-options" className="block mb-2 text-sm font-bold text-gray-900">
        Select scraping model
      </label>
      <div
        className="items-center py-3 flex justify-between w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
        id="model-options">
        <div className="w-1/3 border-r border-gray-200">
          <div className="flex items-center ps-3">
            <input
              id="smart-scraper"
              type="radio"
              value="smartScraper"
              name="model-options"
              checked={selectedModel === 'smartScraper'}
              onChange={handleModelChange}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="smart-scraper" className="w-full ms-2 text-sm font-medium text-gray-900">
              Smart Scraper
            </label>
          </div>
        </div>

        <div className="w-1/3 border-r border-gray-200">
          <div className="flex items-center ps-3">
            <input
              id="searchScraper"
              type="radio"
              value="searchScraper"
              name="model-options"
              checked={selectedModel === 'searchScraper'}
              onChange={handleModelChange}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="searchScraper" className="w-full ms-2 text-sm font-medium text-gray-900">
              Search Scraper
            </label>
          </div>
        </div>

        <div className="w-1/3">
          <div className="flex items-center ps-3">
            <input
              id="markdownify"
              type="radio"
              value="markdownify"
              name="model-options"
              checked={selectedModel === 'markdownify'}
              onChange={handleModelChange}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="markdownify" className="w-full ms-2 text-sm font-medium text-gray-900">
              Markdownify
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

ModelSelector.propTypes = {
  value: PropTypes.oneOf(['smartScraper', 'searchScraper', 'markdownify']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ModelSelector;
