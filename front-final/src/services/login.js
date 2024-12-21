import axios from 'axios';

export const login = async (email,password) => {
  try {
    const response = await axios.post('http://localhost:8080/login', { email, password });
    return response.data; // The API returns an array of products
  } catch (error) {
    console.error('Error logining:', error);
    return []; // Return an empty array in case of an error
  }
};

export const getUserData = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // The API returns an array of products
  } catch (error) {
    console.error('Error logining:', error);
    return null; // Return an empty array in case of an error
  }
};

