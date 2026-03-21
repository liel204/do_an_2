import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detailColor = createAsyncThunk(
  "options/detailColor",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/optionRouter/detailColor?id=${id}`
    );
    return response;
  }
);
