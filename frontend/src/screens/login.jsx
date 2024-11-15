import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPopup from './../components/ErrorPopup';
import '../styling/login.css'


const Login = (props) => {
  const { setLoggedIn, setEmail } = props;
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false); 
  
  const navigate = useNavigate();

  const onFormSubmit = (event) => {
    event.preventDefault();
    
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (!password) {
      setPasswordError("Please enter a password");
      return;
    }

    // Make API call for login
    axios.post("http://localhost:5005/admin/auth/login", { email, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token);
          setEmail(email);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage("Login failed. Please check your details.");
          setShowError(true);
        } else {
          setErrorMessage("An error occurred. Please try again later.");
          setShowError(true);
        }
      });
  };

  const onBackButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <div>
      <button onClick={onBackButtonClick}>
        Back to Landing Page
      </button>
      </div>
      <br />
      
      {/* Use form for better accessibility */}
      <form onSubmit={onFormSubmit}>
        <div>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmailInput(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div>
          <input
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className='flexCenter'>
          <input
            className="loginButton"
            type="submit"
            value="Log in"
          />
        </div>
      </form>

      {showError && (
        <ErrorPopup message={errorMessage} onClose={() => setShowError(false)} />
      )}
    </div>
  );
};

export default Login;