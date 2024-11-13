import { useEffect, useState } from 'react';
import LogoutButton from '../components/Logout';
import { getData } from '../components/Router';
import CreatePresentation from '../components/CreatePresentation';
import PresentationOptions from '../components/PresentationOptions';
import '../styling/dashboard.css';
import logo from '../assets/presto.png';

const Dashboard = ({ setLoggedIn }) => {
  const [userData, setUserData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presentations, setPresentations] = useState([]);
  const [selectedPresentation, setSelectedPresentation] = useState(null);  // Track selected presentation
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);  // Track if options popup is open
  
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
    // navigate(`/presentation/edit/${selectedPresentation.id}`);
    console.log(`Edit presentation with ID: ${selectedPresentation.id}`);
  };

  const handleView = () => {
    closeOptions();
    // Example: navigate(`/presentation/view/${selectedPresentation.id}`);
    console.log(`View presentation with ID: ${selectedPresentation.id}`);
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
              onClick={() => openOptions(presentation)}  // Open options on click
            >
              <img
                src={presentation.thumbnail instanceof File 
                    ? URL.createObjectURL(presentation.thumbnail) 
                    : ''}
                alt="Thumbnail"
                className="presentationThumbnail"
              />
              <h3>{presentation.name}</h3>
              <p>{presentation.description}</p>
            </div>
          ))
        ) : (
          <div>No presentations available</div>
        )}
        <div>Box 1</div>
        <div>Box 2</div>
        <div>Box 3</div>
        <div>Box 4</div>
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
