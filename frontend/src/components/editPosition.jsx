import { useState } from 'react';
import '../styling/Create.css';

const EditPosition = ({ element, onSavePosition }) => {
  const [x, setX] = useState(element.position.x);
  const [y, setY] = useState(element.position.y);
  const [fontFamily, setFontFamily] = useState(element.fontFamily || 'monospace'); // Default to 'monospace' if not provided

  const handleSave = () => {
    const updatedElement = { ...element, position: { x, y } };

    // Only add fontFamily if element type is 'code' or 'text'
    if (element.type === 'code' || element.type === 'text') {
      updatedElement.fontFamily = fontFamily;
    }

    onSavePosition(updatedElement);
  };

  return (
    <div className="modalBackground">
      <div className="modalContent">
        <h2>Edit Position</h2>
        <label>
          X Position (%):
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            min="0"
            max="100"
          />
        </label>
        <label>
          Y Position (%):
          <input
            type="number"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
            min="0"
            max="100"
          />
        </label>

        {/* Conditionally render the font-family field for 'code' or 'text' elements */}
        {(element.type === 'code' || element.type === 'text') && (
          <label>
            Font Family:
            <input
              type="text"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              placeholder="Enter font family"
            />
          </label>
        )}

        <div className="modalActions">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditPosition;