import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register'; 
import Dashboard from './screens/dashboard'; // Import Dashboard component
import './styling/App.css';
import './styling/index.css';
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check for token or login status on page load
    const token = localStorage.getItem('authToken');
    if (token) {
      setLoggedIn(true);
      setEmail(localStorage.getItem('email')); // Store email in localStorage as well
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Redirect to home if logged in, otherwise show home page */}
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/dashboard" /> : <Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          
          {/* Login route, redirect to dashboard if logged in */}
          <Route 
            path="/login" 
            element={loggedIn ? <Navigate to="/dashboard" /> : <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          
          {/* Register route, redirect to dashboard if logged in */}
          <Route 
            path="/register" 
            element={loggedIn ? <Navigate to="/dashboard" /> : <Register setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          
          {/* Dashboard route, only accessible if logged in */}
          <Route 
            path="/dashboard" 
            element={loggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;