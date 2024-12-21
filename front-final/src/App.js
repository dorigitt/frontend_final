import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import { WishlistProvider } from './context/WishlistContext';
import { useDispatch } from 'react-redux';
import { getUser } from './slices/AuthSlice';

const App = () => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token exists in localstorage');
  } else {
    console.log('No token in localstorage');
  }


  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      console.log('Token exists in localstorage');
      dispatch(getUser(token))
    }
  })
  return (
    <CartProvider> {/* Wrap the entire app with CartProvider */}
      <WishlistProvider> {/* Wrap the app with WishlistProvider as well */}
        <Router>
          <MainLayout />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
