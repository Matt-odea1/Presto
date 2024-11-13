import { useNavigate } from 'react-router-dom';

// Function to set (update) data
export const setData = async (data) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(
      'http://localhost:5005/store',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Data successfully updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Function to get (retrieve) data
export const getData = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(
      'http://localhost:5005/store',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
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

  // Function to handle login or logout navigation
  const navigateToLogin = (loggedIn, setLoggedIn) => {
    if (loggedIn) {
      // Log out the user
      setLoggedIn(false);
      localStorage.removeItem('authToken'); // Remove auth token if needed
      navigate('/'); // Redirect to home or any other page
    } else {
      // Redirect to login page
      navigate('/login');
    }
  };

  // Function to handle register navigation
  const navigateToRegister = () => {
    navigate('/register');
  };

  // Function to handle navigation to dashboard
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return {
    navigateToLogin,
    navigateToRegister,
    navigateToDashboard,
  };
};