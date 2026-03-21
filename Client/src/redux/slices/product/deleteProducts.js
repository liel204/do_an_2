import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "categorys/deleteProduct",
  async ({ id }) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/ProductRouter/deleteObj?id=${id}`
    );
    return response;
  }
);
