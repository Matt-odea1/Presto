import { useCustomNavigation } from './../components/Router';
import logo from '../assets/presto.png';
import '../styling/login.css'

const Home = (props) => {
  const { loggedIn, setLoggedIn } = props;
  const { navigateToLogin, navigateToRegister } = useCustomNavigation();

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <img className='loginLogo' src={logo} alt="Logo" />
      </div>
      <div className='landingText'> Please log in or register to access Presto</div>
      <div className="buttonContainer">
        <input
          className="loginButton"
          type="button"
          onClick={() => navigateToLogin(loggedIn, setLoggedIn)}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {!loggedIn && (
          <div>
            <input
              className="loginButton"
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