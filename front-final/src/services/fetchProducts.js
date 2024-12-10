import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/products');
    return response.data; // The API returns an array of products
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array in case of an error
  }
};
