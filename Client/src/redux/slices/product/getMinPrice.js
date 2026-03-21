import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMinPrice = createAsyncThunk(
  "products/getMinPrice",
  async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/ProductRouter/getMinPrice?id=${id}`
    );
    return res.data.data;
  }
);
