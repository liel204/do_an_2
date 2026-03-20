import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  status: "",
  isError: false,
};

export const getMemory = createAsyncThunk("products/getMemory", async (id) => {
  const res = await axios.get(
    `http://localhost:8000/api/productRouter/getDetail?id=${id}`
  );
  const Product_Name = res.data.data.Product_Name;
  const response = await axios.get(
    `http://localhost:8000/api/productRouter/getMemory?Product_Name="${Product_Name}"`
  );
  return response.data.data;
});

export const memoryProduct = createSlice({
  name: "productMemory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMemory.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getMemory.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(getMemory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default memoryProduct.reducer;
