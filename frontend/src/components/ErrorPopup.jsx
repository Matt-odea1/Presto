import React from 'react';
import './../styling/ErrorPopup.css';

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className="errorPopup">
      <div className="errorPopupContent">
        <span className="errorMessage">{message}</span>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default ErrorPopup;