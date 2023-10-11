import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postAnswers = createAsyncThunk(
  "ans/submitAns",
  async ({ userId, answers }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/questions/submit", { userId, answers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const answerSlice = createSlice({
  name: "answers",
  initialState: {
    answers: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAnswers.fulfilled, (state, action) => {
        state.answers = action.payload;
        state.error = null;
      })
      .addCase(postAnswers.rejected, (state, action) => {
        state.answers = null;
        state.error = action.payload.message;
      });
  },
});

export default answerSlice.reducer;
