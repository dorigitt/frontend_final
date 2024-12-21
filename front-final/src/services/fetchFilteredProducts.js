import axios from 'axios';

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