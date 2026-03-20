import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "categorys/deleteProduct",
  async ({ id }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/ProductRouter/deleteObj?id=${id}`
    );
    return response;
  }
);
