import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register'; 
import Dashboard from './screens/dashboard';
import Slide from './screens/Slide';
import './styling/App.css';
import './styling/index.css';
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setLoggedIn(true);
      setEmail(localStorage.getItem('email'));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/dashboard" /> : <Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          
          <Route 
            path="/login" 
            element={loggedIn ? <Navigate to="/dashboard" /> : <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          
          <Route 
            path="/register" 
            element={loggedIn ? <Navigate to="/dashboard" /> : <Register setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          
          <Route 
            path="/dashboard" 
            element={loggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} 
          />

          <Route 
            path="/presentation/:id" 
            element={loggedIn ? <Slide setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} 
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;