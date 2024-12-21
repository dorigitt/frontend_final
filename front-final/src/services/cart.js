import axios from 'axios';

export const addToCart = async (productId, quantity) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:8080/cart', {
            product_id: productId,
            quantity,
        }, {

            headers: {
              Authorization: `Bearer ${token}`,
            },
              });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return null;
    }
};

export const getCartItems = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8080/cart', {

      headers: {
        Authorization: `Bearer ${token}`,
      },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
};

export const deleteFromCart = async (productId) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://localhost:8080/cart/${productId}`,  {

            headers: {
              Authorization: `Bearer ${token}`,
            },
              });
        return response.data;
    } catch (error) {
        console.error('Error deleting from cart:', error);
        return null;
    }
};