import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateColor = createAsyncThunk(
  "options/updateColor",
  async (obj) => {
    const response = await axios.put(
      `https://do-an-2-tffk.onrender.com/api/optionRouter/updateColor`,
      obj,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }
);
