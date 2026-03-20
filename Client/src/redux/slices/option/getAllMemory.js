import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMemory = createAsyncThunk(
  "options/getAllMemory",
  async (productID) => {
    const response = await axios.get(
      `http://localhost:8000/api/optionRouter/getAllMemory?id=${productID}`
    );
    return response.data.data;
  }
);

const initialState = {
  listoption: [],
  isLoading: true,
  isError: false,
};

export const allOption = createSlice({
  name: "getAllOder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMemory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllMemory.fulfilled, (state, action) => {
      state.listoption = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllMemory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allOption.reducer;
