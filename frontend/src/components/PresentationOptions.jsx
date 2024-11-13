// PresentationOptions.jsx
import React from 'react';
import '../styling/dashboard.css';

const PresentationOptions = ({ onClose, onEdit, onView }) => {
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button onClick={onEdit}>Edit Presentation</button>
        <button onClick={onView}>View Presentation</button>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default PresentationOptions;