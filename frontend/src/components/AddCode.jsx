import { useState } from 'react';
import '../styling/Create.css';

const AddCode = ({ onClose, onSave }) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [codeContent, setCodeContent] = useState('');
  const [fontSize, setFontSize] = useState(1);

  const handleAddCode = () => {
    const newCodeElement = {
      type: 'code',
      position: { x: 0, y: 0 },
      size: { width: width, height: height },
      code: codeContent,
      fontSize: fontSize,
      layer: 0,
    };
    onSave(newCodeElement);
    onClose();
  };

  return (
    <div>
      <button onClick={() => setWidth(560) && setHeight(315)}>Add Code</button>

      <div className="modalBackground">
        <div className="modalContent">
          <h2>Add Code Element</h2>
          <label>
            Code Block Width:
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min="0"
              max="100"
            />
          </label>
          <label>
            Code Block Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min="0"
              max="100"
            />
          </label>
          <label>
            Code:
            <textarea
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              placeholder="Write your code here..."
            />
          </label>
          <label>
            Font Size (em):
            <input
              type="number"
              step="0.1"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="0.1"
              max="10"
            />
          </label>
          <div className="modalActions">
            <button onClick={handleAddCode}>Add Code</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCode;