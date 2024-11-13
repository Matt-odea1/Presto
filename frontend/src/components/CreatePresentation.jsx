import React, { useState } from 'react';
import '../styling/Create.css';

const CreatePresentation = ({ closeModal, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleCreate = () => {
    const newPresentation = {
      name,
      description,
      thumbnail,
      id: Date.now(),
    };
    
    // Call the onCreate function passed from parent (Dashboard) to handle new presentation
    onCreate(newPresentation);
    closeModal(); // Close the modal after creation
  };

  return (
    <div className="modalBackground">
      <div className="modalContent">
        <h2>Create New Presentation</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter presentation name"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter presentation description"
            required
          />
        </label>
        <label>
          Thumbnail:
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        <div className="modalActions">
          <button onClick={handleCreate}>Create</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePresentation;