// src/components/LogoutButton.js
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    setLoggedIn(false);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <input
      className="inputButton"
      type="button"
      onClick={onLogoutClick}
      value="Log out"
    />
  );
};

export default LogoutButton;