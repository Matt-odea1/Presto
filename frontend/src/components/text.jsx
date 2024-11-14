import React, { useState } from 'react';
import Modal from './Modal';
import { v4 as uuidv4 } from 'uuid';

const Text = ({ onAddText }) => {
  const [showModal, setShowModal] = useState(false);
  const [size, setSize] = useState(50);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(1); 
  const [color, setColor] = useState('#000000'); 

  const handleAddText = () => {
    const newTextElement = {
      id: uuidv4(),
      type: 'text',
      position: { x: 0, y: 0 }, 
      size: { width: size, height: size },
      content: text,
      'font-size': fontSize,
      colour: color,
      layer: 0, 
    };
    onAddText(newTextElement);
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add Text</button>

      {showModal && (
        <Modal>
          <div className="modal-content">
            <h2>Add Text Element</h2>
            <label>
              Text Size (Width and Height):
              <input type="number" value={size} onChange={(e) => setSize(e.target.value)} min="1" max="100" />
            </label>
            <label>
              Text Content:
              <textarea value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <label>
              Font Size (em):
              <input type="number" step="0.1" value={fontSize} onChange={(e) => setFontSize(e.target.value)} min="0.1" />
            </label>
            <label>
              Text Color (HEX):
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </label>
            <button onClick={handleAddText}>Add Text</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Text;