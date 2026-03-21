import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createColor = createAsyncThunk(
  "options/createColor",
  async (obj) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/optionRouter/addnewColor`,
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
