import { useState } from 'react';
import '../styling/Create.css';

const AddImage = ({ onClose, onSave }) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [altTag, setAltTag] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAddImage = () => {
    const newImageElement = {
      type: 'image',
      position: { x: 0, y: 0 },
      size: { width: width, height: height },
      file: imageSrc,
      'alt-tag': altTag,
      layer: 0,
    };
    onSave(newImageElement);
    onClose();
  };

  return (
    <div>
      <button onClick={() => setWidth() && setHeight()}>Add Image</button>

      <div className="modalBackground">
        <div className="modalContent">
          <h2>Add Image Element</h2>
          <label>
            Image Width:
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min="0"
              max="100"
            />
          </label>
          <label>
            Image Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min="0"
              max="100"
            />
          </label>
          <label>
            Image File:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          {imageSrc && (
            <div>
              <img src={imageSrc} alt="Selected Preview" width="100" />
            </div>
          )}
          <label>
            Alt Tag:
            <input
              type="text"
              value={altTag}
              onChange={(e) => setAltTag(e.target.value)}
            />
          </label>
          <div className="modalActions">
            <button onClick={handleAddImage}>Add Image</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImage;