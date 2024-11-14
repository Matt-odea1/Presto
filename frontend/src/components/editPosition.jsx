import { useState } from 'react';

const EditPosition = ({ element, onSavePosition }) => {
  const [x, setX] = useState(element.position.x);
  const [y, setY] = useState(element.position.y);

  const handleSave = () => {
    onSavePosition({ ...element, position: { x, y } });
  };

  return (
    <div className="modal-content">
      <h2>Edit Position</h2>
      <label>
        X Position (%):
        <input type="number" value={x} onChange={(e) => setX(e.target.value)} min="0" max="100" />
      </label>
      <label>
        Y Position (%):
        <input type="number" value={y} onChange={(e) => setY(e.target.value)} min="0" max="100" />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => onSavePosition(null)}>Cancel</button>
    </div>
  );
};

export default EditPosition;