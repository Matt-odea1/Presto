// PresentationOptions.jsx
import '../styling/dashboard.css';

const PresentationOptions = ({ onClose, onEdit, onView }) => {
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button onClick={onEdit} className="editButton">Edit Presentation</button>
        <button onClick={onView} className="previewButton">Preview Presentation</button>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default PresentationOptions;