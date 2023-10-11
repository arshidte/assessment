import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async action for user registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const clearUserState = createAction('user/clearUserState');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userInfo = null;
        state.error = action.payload.message;
      })
      .addCase(clearUserState, (state) => {
        state.userInfo = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;