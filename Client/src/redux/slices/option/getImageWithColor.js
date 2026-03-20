import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getImageWithColor = createAsyncThunk(
  "options/getImageWithColor",
  async ({ id }) => {
    const response = await axios.get(
      `http://localhost:8000/api/optionRouter/getImageWithColor?id=${id}`
    );
    return response.data.data;
  }
);

const initialState = {
  listoption: {},
  isLoading: true,
  isError: false,
};

export const allOption = createSlice({
  name: "getAllOptionColor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getImageWithColor.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getImageWithColor.fulfilled, (state, action) => {
      state.listoption = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getImageWithColor.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allOption.reducer;
