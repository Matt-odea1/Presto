import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../components/Router';
import '../styling/ErrorPopup.css'; 

const DeletePresentation = ({ presentationId, onCancel }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const data = await getData();
      const updatedData = {
        store: {
          ...data.store,
          presentations: data.store.presentations.filter(p => p.id !== presentationId),
        },
      };
      await setData(updatedData);
      navigate('/dashboard'); // Navigate back to dashboard
    } catch (error) {
      console.error('Error deleting presentation:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <p>Are you sure you want to delete this presentation?</p>
        <div className="error-popup-message">
          <button onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Yes'}
          </button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePresentation;