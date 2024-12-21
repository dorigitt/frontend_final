import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData, login } from '../services/login'; // Assumes these services exist

// Thunks for async operations
export const getUser = createAsyncThunk('auth/getUser', async (token) => {
  const user = await getUserData(token); // Fetches user by ID
  return user;
});

export const getLogin = createAsyncThunk('auth/getLogin', async ({email, password}) => {
  const user = await login(email,password);
  console.log("user",user)
  return user;
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // User information
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    isModalOpen: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null; // Clear user on logout
      localStorage.removeItem('token'); // Clear token from local storage
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching user
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle user login
      .addCase(getLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token); 
        state.isModalOpen = false      })
      .addCase(getLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions; // Export logout action
export const { openModal, closeModal } = authSlice.actions;

export default authSlice.reducer;
