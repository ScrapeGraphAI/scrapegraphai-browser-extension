import React, { useEffect, useState, useCallback } from 'react';
import useApiKey from '../hooks/useApiKey';
import { getCredits } from 'scrapegraph-js';

const CreditsInfo = () => {
  const [remainingCredits, setRemainingCredits] = useState(null);
  const [totalCreditsUsed, setTotalCreditsUsed] = useState(null);
  const { apiKey, apiKeyError } = useApiKey();

  const fetchUserCredits = useCallback(async () => {
    if (apiKey && !apiKeyError) {
      try {
        const credits = await getCredits(apiKey);
        setRemainingCredits(credits.remaining_credits);
        setTotalCreditsUsed(credits.total_credits_used);
      } catch (error) {
        console.error('Error checking credits:', error);
      }
    }
  }, [apiKey, apiKeyError]);

  useEffect(() => {
    fetchUserCredits();
  }, [fetchUserCredits]);

  return (
    <>
      <span className="block mb-2 text-sm font-bold text-gray-900">Credits info</span>
      <div className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        <div className="w-full py-3 border-b border-gray-200">
          <div className="flex items-center ps-3">
            <span className="text-sm text-gray-900">
              Remaining credits:
              <span className="text-md font-semibold text-gray-900">
                {remainingCredits !== null ? ' ' + remainingCredits : ' Loading...'}
              </span>
            </span>
          </div>
        </div>

        <div className="w-full py-3">
          <div className="flex items-center ps-3">
            <span className="text-sm text-gray-900">
              Total credits used:
              <span className="text-md font-semibold text-gray-900">
                {totalCreditsUsed !== null ? ' ' + totalCreditsUsed : ' Loading...'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditsInfo;
