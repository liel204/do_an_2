import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateColor = createAsyncThunk(
  "options/updateColor",
  async (obj) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/optionRouter/updateColor`,
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
