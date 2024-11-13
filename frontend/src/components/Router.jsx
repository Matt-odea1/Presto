import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Function to set data
export const setData = async (data) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(
      'http://localhost:5005/store',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Data successfully updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const getData = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No authToken in localStorage');
    }

    console.log('Making API call to get data...');
    const response = await axios.get(
      'http://localhost:5005/store',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Data retrieved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};

export const useCustomNavigation = () => {
  const navigate = useNavigate();

  // Navigate to login page
  const navigateToLogin = (loggedIn, setLoggedIn) => {
    if (loggedIn) {
      setLoggedIn(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('email');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  // Navigate to register page
  const navigateToRegister = () => {
    navigate('/register');
  };

  // Navigate to dashboard page
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  // Navigate to a slide deck for editing
  const navigateToSlideDeck = (presentationId) => {
    navigate(`/presentation/${presentationId}`);
  };

  return {
    navigateToLogin,
    navigateToRegister,
    navigateToDashboard,
    navigateToSlideDeck,
  };
};