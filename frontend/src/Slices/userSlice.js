import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearLoginState = createAction('user/clearLoginState');

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userInfo = null;
        state.error = action.payload.message;
      })
      .addCase(clearLoginState, (state) => {
        state.userInfo = null;
        state.error = null;
      });
  },
});

export default loginSlice.reducer;