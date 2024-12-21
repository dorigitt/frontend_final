import axios from 'axios';

export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8080/search?name=${query}`);
    return response.data; // Return the search results
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};