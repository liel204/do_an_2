import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCart = createAsyncThunk(
  "carts/deleteCart",
  async ({ id }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/CartItemRouter/deleteObj?id=${id}`
    );
    return response.data.data;
  }
);
