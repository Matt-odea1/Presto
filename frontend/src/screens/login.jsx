import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPopup from './../components/ErrorPopup';

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
    event.preventDefault(); // Prevent default form submission behavior
    
    setEmailError("");
    setPasswordError("");

    // Basic email and password validations
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
          setEmail(email);
          setLoggedIn(true);
          navigate("/");
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

  // Handle Enter key press to submit the form from anywhere
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onFormSubmit(event); // Trigger form submission
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <button className="backButton" onClick={onBackButtonClick}>
        Back to Landing Page
      </button>
      <br />
      
      {/* Use form for better accessibility */}
      <form onSubmit={onFormSubmit}>
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmailInput(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className="inputContainer">
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
        <div className="inputContainer">
          {/* Submit button for the form */}
          <input
            className="inputButton"
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