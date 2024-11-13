import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (token) {
        await axios.post(
          '/admin/auth/logout', 
          {}, 
          {
            headers: { 
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      localStorage.removeItem('authToken');
      setLoggedIn(false);

      navigate('/');
    } catch (error) {
      console.error('Logout error', error);
    }
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