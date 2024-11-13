import { useEffect, useState } from 'react';
import LogoutButton from '../components/Logout';
import { getData } from '../components/Router';
import '../styling/dashboard.css';
import logo from '../assets/presto.png';


const Dashboard = ({ setLoggedIn }) => {
  const [userData, loadData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presentations, setPresentations] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreatePresentation = (newPresentation) => {
    setPresentations((prevPresentations) => [
      ...prevPresentations,
      newPresentation,
    ]);
  };

  useEffect(() => {
    console.log('useEffect: Fetching user data');
    const fetchUserData = async () => {
      try {
        const data = await getData();
        console.log('useEffect: Data fetched', data.store.email);

        // Assuming data is nested under 'store'
        if (data && data.store && data.store.email && data.store.name) {
          loadData({ email: data.store.email, name: data.store.name });
        } else {
          loadData(undefined);
        }
      } catch (error) {
        console.error('useEffect: Error fetching user data', error);
        loadData(undefined);
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
        {presentations.map((presentation) => (
          <div key={presentation.id} className="presentationItem">
            <img
              src={presentation.thumbnail ? URL.createObjectURL(presentation.thumbnail) : ''}
              alt="Thumbnail"
              className="presentationThumbnail"
            />
            <h3>{presentation.name}</h3>
            <p>{presentation.description}</p>
          </div>
        ))}
        <div>Box 1</div>
        <div>Box 2</div>
        <div>Box 3</div>
        <div>Box 4</div>
      </div>
      {isModalOpen && (
        <CreatePresentation
          closeModal={closeModal}
          onCreate={handleCreatePresentation}
        />
      )}
    </div>
  );
};

export default Dashboard;