import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  type,
  value,
  onChange,
  onError = false,
  onErrorMessage = '',
  label = null,
  placeholder = '',
}) => {
  return (
    <>
      {label && <label className="block text-sm font-bold text-gray-900">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`block w-full mt-2 p-2.5 text-sm text-gray-900 rounded-lg border ${
          onError
            ? 'bg-red-50 border-red-500 focus:outline-red-500 focus:ring-red-500'
            : 'bg-gray-50 border-gray-300 focus:outline-purple-500 focus:ring-purple-500'
        }`}
        placeholder={placeholder}
      />
      {onError && <p className="mt-1 text-xs text-red-600">{onErrorMessage}</p>}
    </>
  );
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.bool,
  onErrorMessage: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextField;
