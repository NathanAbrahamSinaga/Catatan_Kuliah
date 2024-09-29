import api from './api';

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/admin/login', { username, password });
    const { token } = response.data;
    
    localStorage.setItem('token', token);
    
    return token;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const registerUser = async (username, password) => {
  try {
    const response = await api.post('/admin/register', { username, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error('Registration failed. Please try again.');
  }
};

export const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
