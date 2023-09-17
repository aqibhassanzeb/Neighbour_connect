import { useState } from "react";

const useAlert = (initialState = { show: false, text: "" }) => {
  const [showAlert, setShowAlert] = useState(initialState);

  const handleShowAlert = (text, duration = 3000) => {
    setShowAlert({ show: true, text });

    setTimeout(() => {
      setShowAlert({ show: false, text: "" });
    }, duration);
  };

  return { showAlert, handleShowAlert };
};

export default useAlert;
