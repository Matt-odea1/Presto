import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const { setLoggedIn, setEmail } = props;
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const navigate = useNavigate();

  const onButtonClick = async () => {
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

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    try {
      const response = await axios.post("/admin/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setEmail(email);  
        setLoggedIn(true); 
        navigate("/");
      }
    } catch (error) {
      // Handle API errors
      if (error.response) {
        if (error.response.status === 400) {
          setEmailError("Registration failed. Please check your details.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
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
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value="Log in"
        />
      </div>
    </div>
  );
};

export default Login;