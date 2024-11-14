import { useState } from 'react';
import '../styling/Create.css'

const EditPosition = ({ element, onSavePosition }) => {
  const [x, setX] = useState(element.position.x);
  const [y, setY] = useState(element.position.y);

  const handleSave = () => {
    onSavePosition({ ...element, position: { x, y } });
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
        <div className="modalActions">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => onSavePosition(null)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditPosition;