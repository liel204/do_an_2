import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "categorys/deleteProduct",
  async ({ id }) => {
    const response = await axios.delete(
      `https://do-an-2-tffk.onrender.com/api/ProductRouter/deleteObj?id=${id}`
    );
    return response;
  }
);
