import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  status: "",
  isError: false,
};

export const getColor = createAsyncThunk("products/getColor", async (id) => {
  const res = await axios.get(
    `http://localhost:8000/api/productRouter/getDetail?id=${id}`
  );
  const Product_Name = res.data.data.Product_Name;
  const response = await axios.get(
    `http://localhost:8000/api/productRouter/getColor?Product_Name="${Product_Name}"`
  );
  return response.data.data;
});

export const colorProduct = createSlice({
  name: "productColor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColor.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getColor.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(getColor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default colorProduct.reducer;
