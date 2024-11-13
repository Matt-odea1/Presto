// src/pages/Home.js
import { useEffect } from 'react';
import { useCustomNavigation } from './../components/Router';

const Home = (props) => {
  const { loggedIn, email, setLoggedIn } = props;
  const { navigateToLogin, navigateToRegister } = useCustomNavigation();

  useEffect(() => {
    // Redirect to another page if the user is logged in
    if (loggedIn) {
      // Replace with your desired redirect (e.g., dashboard or profile page)
      window.location.href = '/dashboard'; // or use navigate('/dashboard') if you prefer using react-router
    }
  }, [loggedIn]);

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the landing page. Please log in or register.</div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={() => navigateToLogin(loggedIn, setLoggedIn)}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {!loggedIn && (
          <div>
            <input
              className="inputButton"
              type="button"
              onClick={navigateToRegister}
              value="Register"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;