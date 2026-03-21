import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCart = createAsyncThunk(
  "carts/deleteCart",
  async ({ id }) => {
    const response = await axios.delete(
      `https://do-an-2-tffk.onrender.com/api/CartItemRouter/deleteObj?id=${id}`
    );
    return response.data.data;
  }
);
