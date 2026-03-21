import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllComent = createAsyncThunk(
  "categorys/getAllComent",
  async (ProductID) => {
    const response = await axios.get(
      `https://do-an-2-tffk.onrender.com/api/comentRouter/getAll?ProductID=${ProductID}`
    );
    return response;
  }
);
