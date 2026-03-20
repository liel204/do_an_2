import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllColor = createAsyncThunk(
  "options/getAllColor",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/optionRouter/getAllColor?productID=${id}`
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
    builder.addCase(getAllColor.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllColor.fulfilled, (state, action) => {
      state.listoption = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllColor.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allOption.reducer;
