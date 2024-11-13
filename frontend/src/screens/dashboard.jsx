import { useEffect, useState } from 'react';
import LogoutButton from '../components/Logout';
import { getData } from '../components/Router';
import '../styling/dashboard.css';
import logo from '../assets/presto.png';


const Dashboard = ({ setLoggedIn }) => {
  const [userData, loadData] = useState(undefined);
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch user data on component mount
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
  }, []); // Empty dependency array to ensure this runs once

  if (loading) {
    return <div>Loading...</div>; // Render loading state
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
          <button className="createPresentationButton">Create Presentation</button>
          <LogoutButton setLoggedIn={setLoggedIn} />
        </div>
      </div>

      {/* Blank content area */}
      <div className="contentArea">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>

        {/* More items can be added dynamically */}
      </div>
    </div>
  );
};

export default Dashboard;