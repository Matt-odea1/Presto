import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPopup from './../components/ErrorPopup';
import { setData } from "../components/Router";

const Register = (props) => {
  const { setLoggedIn, setEmail } = props;
  const [name, setName] = useState("");
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showError, setShowError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onFormSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (page refresh)
    
    // Clear previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!name) {
      setNameError("Please enter your name");
      return;
    }

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

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Call the API if validation passes
    axios.post("http://localhost:5005/admin/auth/register", { name, email, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token);
          setEmail(email);  
          setLoggedIn(true);  
          const initialData = {
            store: {
              name,
              email,
              presentations: [],
            },
          };
          console.log("set new user data" + initialData.store.name + " and " + initialData.store.email);
          setData(initialData);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMessage("Registration failed. Please check your details.");
            setShowError(true);
          } else {
            setErrorMessage("An error occurred. Please try again later.");
            setShowError(true);
          }
        }
      });
  };

  // Back button handler
  const onBackButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Register</div>
      </div>
      <div>
        <button className="backButton" onClick={onBackButtonClick}>
          Back to Landing Page
        </button>
      </div>
      <br />
      
      {/* Use form for better accessibility */}
      <form onSubmit={onFormSubmit}>
        <div className="inputContainer">
          <input
            value={name}
            placeholder="Enter your name here"
            onChange={(ev) => setName(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{nameError}</label>
        </div>
        <br />
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
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{confirmPasswordError}</label>
        </div>
        <br />
        <div className="flexCenter">
          {/* Submit button for the form */}
          <input
            className="loginButton"
            type="submit"
            value="Register"
          />
        </div>
      </form>

      {showError && (
        <ErrorPopup message={errorMessage} onClose={() => setShowError(false)} />
      )}
    </div>
  );
};

export default Register;