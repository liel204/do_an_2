import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detailColor = createAsyncThunk(
  "options/detailColor",
  async (id) => {
    const response = await axios.get(
      `https://do-an-2-tffk.onrender.com/api/optionRouter/detailColor?id=${id}`
    );
    return response;
  }
);
