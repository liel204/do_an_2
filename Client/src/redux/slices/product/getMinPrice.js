import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMinPrice = createAsyncThunk(
  "products/getMinPrice",
  async (id) => {
    const res = await axios.get(
      `https://do-an-2-tffk.onrender.com/api/ProductRouter/getMinPrice?id=${id}`
    );
    return res.data.data;
  }
);
