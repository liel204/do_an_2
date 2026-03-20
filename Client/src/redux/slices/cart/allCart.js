import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getAllCart = createAsyncThunk("carts/getAllCart", async () => {
  const response = await axios.get(
    `http://localhost:8000/api/cartItemRouter/getAll?UserID=${
      jwtDecode(localStorage.getItem("token")).id
    }`
  );
  return response.data.data;
});

export const getPrice = createAsyncThunk("carts/getPrice", async (id) => {
  const response = await axios.get(
    `http://localhost:8000/api/CartItemRouter/getPrice?id=${id}`
  );
  return response;
});

const initialState = {
  listcart: [],
  isLoading: true,
  isError: false,
};

export const allCart = createSlice({
  name: "getAllCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCart.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllCart.fulfilled, (state, action) => {
      state.listcart = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllCart.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allCart.reducer;
