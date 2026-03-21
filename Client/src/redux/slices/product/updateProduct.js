import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProduct = createAsyncThunk(
  "categorys/updateProduct",
  async (obj) => {
    console.log("first", obj);
    const response = await axios.put(
      "https://do-an-2-tffk.onrender.com/api/ProductRouter/updateObj",
      obj
    );
    return response;
  }
);
