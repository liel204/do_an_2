import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const resetDetailProduct = createAsyncThunk(
  "products/resetDetailProduct",
  async ({ Product_Color, Product_Memory, Product_Name }) => {
    const response = await axios.get(
      `http://localhost:8000/api/ProductRouter/findIdProduct?Product_Color=${Product_Color}&Product_Memory=${Product_Memory}&Product_Name=${Product_Name}`
    );
    return response.data.data[0].id;
  }
);

const initialState = {
  product: "",
  status: "",
  isError: false,
};

export const detailProduct = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetDetailProduct.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(resetDetailProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(resetDetailProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default detailProduct.reducer;
