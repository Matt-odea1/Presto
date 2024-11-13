import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email, setLoggedIn } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (loggedIn) {
      setLoggedIn(false)
    } else {
      navigate('/login')
    }
  }

  const onRegisterClick = () => {
    navigate('/register') // Navigate to the register page
  }

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? (
          <div>Your email address is {email}</div>
        ) : (
          <div>
            <input
              className="inputButton"
              type="button"
              onClick={onRegisterClick}
              value="Register" // Register button for logged-out users
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home