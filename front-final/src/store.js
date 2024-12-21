import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import AuthSlice from './slices/AuthSlice';
import { cartSlice } from './slices/CartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: AuthSlice,
    cart: cartSlice.reducer
  },
});

export default store;
