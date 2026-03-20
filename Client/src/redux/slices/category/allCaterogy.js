import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategory = createAsyncThunk(
  "categorys/getAllCategory",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/CategoryRouter/getAll"
    );
    return response.data.data;
  }
);

const initialState = {
  listcategory: [],
  isLoading: true,
  isError: false,
};

export const allCategory = createSlice({
  name: "getAllCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.listcategory = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allCategory.reducer;
