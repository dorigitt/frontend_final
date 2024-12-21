import axios from 'axios';

export const fetchItemReviews = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${itemId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  };

  export const leaveReview = async (itemId, reviewText, rating) => {
    try {
      const response = await axios.post('http://localhost:8080/review', {
        product_id: itemId,
        review_text: reviewText,
        rating,
      });
      return response.data;
    } catch (error) {
      console.error('Error leaving review:', error);
      return null;
    }
  };


