import { useNavigate } from 'react-router-dom';

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