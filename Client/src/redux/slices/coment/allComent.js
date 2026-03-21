import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllComent = createAsyncThunk(
  "categorys/getAllComent",
  async (ProductID) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/comentRouter/getAll?ProductID=${ProductID}`
    );
    return response;
  }
);
