// src/pages/dashboard.js
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
  const { setLoggedIn } = props;
  const navigate = useNavigate();

  const onLogoutClick = () => {
    setLoggedIn(false);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Dashboard</div>
      </div>
      <div>Welcome to your dashboard!</div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onLogoutClick}
          value="Log out"
        />
      </div>
    </div>
  );
};

export default Dashboard;