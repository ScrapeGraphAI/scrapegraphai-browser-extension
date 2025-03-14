import React from 'react';
import PropTypes from 'prop-types';

const CloseableErrorAlert = ({ alertType = 'success', message, closeable = false, onClose }) => {
  return (
    <div
      className={`flex items-center p-4 mb-4 ${alertType === 'error' ? 'text-red-800 rounded-lg bg-red-50' : 'text-green-800 rounded-lg bg-green-50'}`}
      role="alert">
      {alertType === 'error' ? (
        <svg
          className="w-6 h-6 me-3"
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
            d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 me-3"
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
            d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )}

      {message}

      {closeable && (
        <button
          type="button"
          className={`ms-auto -mx-1.5 -my-1.5 inline-flex items-center justify-center h-8 w-8 
            ${
              alertType === 'error'
                ? 'bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200'
                : 'bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200'
            }`}
          aria-label="Close"
          onClick={onClose}>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

CloseableErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  closeable: PropTypes.bool,
  alertType: PropTypes.string.isRequired,
};

export default CloseableErrorAlert;
