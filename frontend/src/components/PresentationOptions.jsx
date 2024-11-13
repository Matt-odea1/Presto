// PresentationOptions.jsx
import '../styling/dashboard.css';

const PresentationOptions = ({ onClose, onEdit, onView }) => {
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button onClick={onEdit}>Edit Presentation</button>
        <button onClick={onView}>Preview Presentation</button>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default PresentationOptions;