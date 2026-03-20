import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/productRouter/getAll"
    );

    return response.data.data;
  }
);

const initialState = {
  listproducts: [],
  isLoading: true,
  isError: false,
};

export const allProduct = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.listproducts = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allProduct.reducer;
