import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "options/createProduct",
  async (obj) => {
    const response = await axios.post(
      "http://localhost:8000/api/ProductRouter/addnew",
      obj
    );
    return response;
  }
);
