import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    const token = localStorage.getItem('authToken');

    if (token) {
      axios
        .post(
          'http://localhost:5005/admin/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          // Remove the token and update the logged-in state
          localStorage.removeItem('authToken');
          setLoggedIn(false);

          // Navigate to the home page
          navigate('/');
        })
        .catch((error) => {
          console.error('Logout error', error);
        });
    } else {
      // If no token, simply log the user out and navigate
      localStorage.removeItem('authToken');
      setLoggedIn(false);
      navigate('/');
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