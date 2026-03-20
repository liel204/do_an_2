import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  status: "",
  isError: false,
};

export const getDetailProduct = createAsyncThunk(
  "products/getDetailProduct",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/productRouter/getDetail?id=${id}`
    );
    return response.data.data;
  }
);

export const detailProduct = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetailProduct.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getDetailProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(getDetailProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default detailProduct.reducer;
