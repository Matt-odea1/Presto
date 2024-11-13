import React, { useState } from "react";
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

  
  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    // Basic email and password validations
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (!password) {
      setPasswordError("Please enter a password");
      return;
    }

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

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <button className="backButton" onClick={onBackButtonClick}>
        Back to Landing Page
      </button>
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
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value="Log in"
        />
      </div>

      {showError && (
        <ErrorPopup message={errorMessage} onClose={() => setShowError(false)} />
      )}
    </div>
  );
};


export default Login;