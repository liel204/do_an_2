import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteColor = createAsyncThunk(
  "options/deleteColor",
  async (obj) => {
    const response = await axios.delete(
      `https://do-an-2-tffk.onrender.com/api/optionRouter/deleteColor?id=${obj}`
    );
    return response;
  }
);
