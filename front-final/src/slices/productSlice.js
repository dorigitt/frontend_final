import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetchProducts';
import { fetchFilteredProducts } from '../services/fetchFilteredProducts';
import { fetchSearchResults } from '../services/fetchSearchResults';

// Thunks for async operations
export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const products = await fetchProducts();
  return products;
});

export const getFilteredProducts = createAsyncThunk(
  'products/getFilteredProducts',
  async (categoryId) => {
    const products = await fetchFilteredProducts(categoryId);
    return products;
  }
);
export const getSearchProducts = createAsyncThunk(
    'products/getSearchProducts',
    async (categoryId) => {
      const products = await fetchSearchResults(categoryId);
      return products;
    }
  );

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching all products
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        // localStorage.setItem('token', action.payload.token);////
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetching filtered products
      .addCase(getFilteredProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSearchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getSearchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
