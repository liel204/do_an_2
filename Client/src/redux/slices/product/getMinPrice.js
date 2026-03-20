import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMinPrice = createAsyncThunk(
  "products/getMinPrice",
  async (id) => {
    const res = await axios.get(
      `http://localhost:8000/api/ProductRouter/getMinPrice?id=${id}`
    );
    return res.data.data;
  }
);
