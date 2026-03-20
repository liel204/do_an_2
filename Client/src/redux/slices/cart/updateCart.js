import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCart = createAsyncThunk(
  "carts/updateCart",
  async ({ id, CartItem_Quantity }) => {
    const obj = {
      id: id,
      CartItem_Quantity: CartItem_Quantity,
    };
    console.log("first", obj);
    const response = await axios.put(
      "http://localhost:8000/api/CartItemRouter/updateObj",
      obj
    );
    console.log("first", response.data.data);

    return response.data.data;
  }
);

export const updateCartStatus = createAsyncThunk(
  "carts/updateCartStatus",
  async (id) => {
    const obj = {
      id: id,
    };
    const response = await axios.put(
      "http://localhost:8000/api/CartItemRouter/updateStatusObj",
      obj
    );
    return response.data.data;
  }
);
