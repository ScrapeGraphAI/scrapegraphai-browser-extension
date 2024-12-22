import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PromptInput = ({ scrapingPrompt, setScrapingPrompt, validationError }) => {
  const [isPromptEmpty, setIsPromptEmpty] = useState(false);

  const handlePromptInput = (prompt) => {
    if (!prompt.trim()) {
      setIsPromptEmpty(true);
    } else {
      setIsPromptEmpty(false);
    }
  };

  return (
    <>
      <label htmlFor="scrapingPrompt" className="block mt-4 mb-2 text-sm font-bold text-gray-900">
        Describe what to scrape
      </label>
      <textarea
        id="scrapingPrompt"
        value={scrapingPrompt}
        onChange={(e) => {
          setScrapingPrompt(e.target.value);
          handlePromptInput(e.target.value);
        }}
        rows="4"
        className={`block w-full mt-2 p-2.5 text-sm text-gray-900 rounded-lg border ${
          validationError || isPromptEmpty
            ? 'bg-red-50 border-red-500 focus:outline-red-500 focus:ring-red-500'
            : 'bg-gray-50 border-gray-300 focus:outline-blue-500 focus:ring-blue-500'
        }`}
        placeholder="Enter scraping instructions..."
      />
      {(validationError || isPromptEmpty) && (
        <p className="mt-1 text-xs text-red-600">This field is required.</p>
      )}
    </>
  );
};

PromptInput.propTypes = {
  scrapingPrompt: PropTypes.string.isRequired,
  validationError: PropTypes.bool.isRequired,
  setScrapingPrompt: PropTypes.func.isRequired,
};

export default PromptInput;
