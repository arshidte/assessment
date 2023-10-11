import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestions = createAsyncThunk("que/getQuestions", async () => {
  try {
    const response = await axios.get("/api/questions");
    return response.data;
  } catch (error) {
    throw error;
  }
});

const questionSlice = createSlice({
  name: "questions",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default questionSlice.reducer;