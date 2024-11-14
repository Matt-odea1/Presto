import { useState } from 'react';

const ChangeThumbnail = ({ onClose, onSave }) => {
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]); // Store selected file
    }
  };

  const handleSave = () => {
    if (thumbnailFile) {
      onSave(thumbnailFile); // Pass the file to onSave
      onClose(); // Close modal after saving
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContent">
        <h2>Change Thumbnail</h2>
        <label>Upload Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // Handle file input change
        />
        <div className="modalActions">
          <button onClick={handleSave} disabled={!thumbnailFile}>
            Save
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeThumbnail;