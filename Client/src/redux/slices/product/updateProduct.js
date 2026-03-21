import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProduct = createAsyncThunk(
  "categorys/updateProduct",
  async (obj) => {
    console.log("first", obj);
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/ProductRouter/updateObj`,
      obj
    );
    return response;
  }
);
