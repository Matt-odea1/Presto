import { useState } from 'react';

const AddText = ({ onClose, onSave }) => {
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(11);
  const [color, setColor] = useState('#000000');

  const handleAddText = () => {
    const newTextElement = {
      type: 'text',
      position: { x: 0, y: 0 },
      size: { width: width, height: height },
      content: text,
      'font-size': fontSize,
      colour: color,
      layer: 0,
    };
    onSave(newTextElement);
    onClose();
  };

  return (
    <div>
      <button onClick={() => setWidth(50) && setHeight(50)}>Add Text</button>
      
      <div className="modalBackground">
        <div className="modalContent">
          <h2>Add Text Element</h2>
          <label>
            Text Width:
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min="0"
              max="100"
            />
          </label>
          <label>
            Text Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min="0"
              max="100"
            />
          </label>
          <label>
            Text Content:
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <label>
            Font Size (px):
            <input
              type="number"
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="1"
            />
          </label>
          <label>
            Text Color (HEX):
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <div className="modalActions">
            <button onClick={handleAddText}>Add Text</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddText;