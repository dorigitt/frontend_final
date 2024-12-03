import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
      <Router>
        <MainLayout/>
      </Router>
     
  );
};

export default App;
