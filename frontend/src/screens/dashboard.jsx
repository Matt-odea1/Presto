import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/Logout';
import { getData, useCustomNavigation } from '../components/Router';
import CreatePresentation from '../components/CreatePresentation';
import PresentationOptions from '../components/PresentationOptions';
import '../styling/dashboard.css';
import logo from '../assets/presto.png';

const Dashboard = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presentations, setPresentations] = useState([]);
  const [selectedPresentation, setSelectedPresentation] = useState(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { navigateToSlideDeck } = useCustomNavigation(); 

  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log('useEffect: Fetching user data');
    const fetchUserData = async () => {
      try {
        const data = await getData();
        console.log('useEffect: Data fetched', data);

        if (data && data.store && data.store.email && data.store.name) {
          setUserData({ email: data.store.email, name: data.store.name });

          if (data.store.presentations) {
            setPresentations(data.store.presentations);
          }
        } else {
          setUserData(undefined);
          setPresentations([]);
        }
      } catch (error) {
        console.error('useEffect: Error fetching user data', error);
        setUserData(undefined);
        setPresentations([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const openOptions = (presentation) => {
    setSelectedPresentation(presentation);
    setIsOptionsOpen(true);
  };

  const closeOptions = () => {
    setSelectedPresentation(null);
    setIsOptionsOpen(false);
  };

  const handleEdit = () => {
    closeOptions();
    navigateToSlideDeck(selectedPresentation.id);
    console.log(`Edit presentation with ID: ${selectedPresentation.id}`);
  };

  const handleView = () => {
    closeOptions();
    navigate(`/presentation/${selectedPresentation.id}/preview`);
    console.log(`Preview presentation with ID: ${selectedPresentation.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainContainer">
      <div className="topBar">
        <img src={logo} alt="Logo" />
        {userData ? (
          <div className="userInfo">
            <span>{userData.name}</span>
            <span>{userData.email}</span>
          </div>
        ) : (
          <div className="userInfo">User data unavailable</div>
        )}
        <div className="actions">
          <button className="newPreso" onClick={openModal}>New Presentation</button>
          <LogoutButton setLoggedIn={setLoggedIn} />
        </div>
      </div>
      
      <div className="contentArea">
        {presentations.length > 0 ? (
          presentations.map((presentation) => (
            <div
              key={presentation.id}
              className="presentationItem"
              onClick={() => openOptions(presentation)}
            >
              <img
                src={presentation.thumbnailPreview}
                alt="Thumbnail"
                className="presentationThumbnail"
              />
              <div>
                <h3>{presentation.name}</h3>
                <p>{presentation.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No presentations available</div>
        )}
      </div>

      {isModalOpen && (
        <CreatePresentation
          closeModal={closeModal}
          userData={userData}
          setUserData={setUserData}
        />
      )}

      {isOptionsOpen && selectedPresentation && (
        <PresentationOptions
          onClose={closeOptions}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}
    </div>
  );
};

export default Dashboard;
