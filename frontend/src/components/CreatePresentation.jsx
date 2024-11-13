import React, { useState, useEffect } from 'react';
import { setData, getData } from '../components/Router.jsx';
import '../styling/Create.css';

const CreatePresentation = ({ closeModal, userData, setUserData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        if (data && data.store) {
          setUserData(data);  // Save fetched data in the parent component state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setUserData]);

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleCreate = async () => {
    const newPresentation = {
      id: Date.now(),
      name,
      description,
      thumbnail,
      defaultBackground: {
        colour: "#ffffff",
        img: undefined,
      },
      slides: [],
    };

    // Ensure user data is loaded
    if (!userData || !userData.store) {
      console.error("User data is unavailable.");
      return;
    }

    // Update the presentations array in userData
    const updatedUserData = {
      store: {
        ...userData.store,
        presentations: [...userData.store.presentations, newPresentation],
      },
    };

    try {
      // Save the updated user data
      await setData(updatedUserData);

      // Update the userData in the parent component
      setUserData(updatedUserData);

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Error creating presentation:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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