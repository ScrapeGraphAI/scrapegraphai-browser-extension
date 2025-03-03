import { useState } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState({
    type: null,
    message: null,
    visible: false,
    closeable: true,
  });

  const showAlert = (type, message, closeable = true) => {
    setAlert({ type, message, visible: true, closeable });
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return { alert, showAlert, hideAlert };
};

export default useAlert;
