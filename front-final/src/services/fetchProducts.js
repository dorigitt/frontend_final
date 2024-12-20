import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/products');
    console.log('Fetched products:', response.data); 
    return response.data; // The API returns an array of products
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchFilteredProducts = async (categoryId) => {
    try {
      const url = categoryId
        ? `http://localhost:8080/products?category_id=${categoryId}`
        : `http://localhost:8080/products`;
  
      const response = await axios.get(url);
      return response.data; // Return filtered products
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      return [];
    }
  };