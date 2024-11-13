import { useCustomNavigation } from './../components/Router';

const Home = (props) => {
  const { loggedIn, setLoggedIn } = props;
  const { navigateToLogin, navigateToRegister } = useCustomNavigation();

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