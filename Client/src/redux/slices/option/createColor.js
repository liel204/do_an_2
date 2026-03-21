import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createColor = createAsyncThunk(
  "options/createColor",
  async (obj) => {
    const response = await axios.put(
      "https://do-an-2-tffk.onrender.com/api/optionRouter/addnewColor",
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
