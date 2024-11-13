// src/pages/dashboard.js
import LogoutButton from './../components/Logout'; // Import the new LogoutButton component

const Dashboard = (props) => {
  const { setLoggedIn } = props;

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Dashboard</div>
      </div>
      <div>Welcome to your dashboard!</div>
      <div className="buttonContainer">
        <LogoutButton setLoggedIn={setLoggedIn} /> {/* Use the LogoutButton here */}
      </div>
    </div>
  );
};

export default Dashboard;