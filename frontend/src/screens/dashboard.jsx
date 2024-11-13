import { useEffect, useState } from 'react';
import LogoutButton from '../components/Logout';
import { getData } from '../components/Router';
import CreatePresentation from '../components/CreatePresentation';
import '../styling/dashboard.css';
import logo from '../assets/presto.png';

const Dashboard = ({ setLoggedIn }) => {
  const [userData, setUserData] = useState(undefined);  // Use setUserData to update user data
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presentations, setPresentations] = useState([]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log('useEffect: Fetching user data');
    const fetchUserData = async () => {
      try {
        const data = await getData();
        console.log('useEffect: Data fetched', data);

        // Assuming data is nested under 'store'
        if (data && data.store && data.store.email && data.store.name) {
          setUserData({ email: data.store.email, name: data.store.name });  // Set user data
          
          // Load presentations from the store
          if (data.store.presentations) {
            setPresentations(data.store.presentations);  // Set presentations from the store
          }
        } else {
          setUserData(undefined);
          setPresentations([]);  // Clear presentations if user data is unavailable
        }
      } catch (error) {
        console.error('useEffect: Error fetching user data', error);
        setUserData(undefined);
        setPresentations([]);  // Clear presentations if there's an error fetching data
      } finally {
        setLoading(false); // Set loading to false once data fetch is complete
      }
    };
    
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainContainer">
      {/* Top bar */}
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
          <button onClick={openModal}>New Presentation</button>
          <LogoutButton setLoggedIn={setLoggedIn} />
        </div>
      </div>
      
      <div className="contentArea">
        {presentations.length > 0 ? (
          presentations.map((presentation) => (
            <div key={presentation.id} className="presentationItem">
            <img
                // If the thumbnail is a File object, create an object URL for it
                src={presentation.thumbnail instanceof File 
                    ? URL.createObjectURL(presentation.thumbnail) 
                    : ''}  // Default to empty if no file
                alt="Thumbnail"
                className="presentationThumbnail"
                />
              <h3>{presentation.name}</h3>
              <p>{presentation.description}</p>
            </div>
          ))
        ) : (
          <div>No presentations available</div>  // Fallback message if there are no presentations
        )}
        <div>Box 1</div>
        <div>Box 2</div>
        <div>Box 3</div>
        <div>Box 4</div>
      </div>

      {/* Pass setUserData as a prop to CreatePresentation */}
      {isModalOpen && (
        <CreatePresentation
          closeModal={closeModal}
          userData={userData}  // Pass userData to CreatePresentation
          setUserData={setUserData}  // Pass setUserData to CreatePresentation
        />
      )}
    </div>
  );
};

export default Dashboard;