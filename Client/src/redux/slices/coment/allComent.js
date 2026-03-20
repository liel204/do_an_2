import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllComent = createAsyncThunk(
  "categorys/getAllComent",
  async (ProductID) => {
    const response = await axios.get(
      `http://localhost:8000/api/comentRouter/getAll?ProductID=${ProductID}`
    );
    return response;
  }
);
