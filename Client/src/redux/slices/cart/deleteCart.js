import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCart = createAsyncThunk(
  "carts/deleteCart",
  async ({ id }) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/CartItemRouter/deleteObj?id=${id}`
    );
    return response.data.data;
  }
);
