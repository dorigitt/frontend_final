import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { CartProvider } from './context/CartContext'; // Import CartProvider

const App = () => {
  return (
    <CartProvider> {/* Wrap the entire app */}
      <Router>
        <MainLayout />
      </Router>
    </CartProvider>
  );
};

export default App;
