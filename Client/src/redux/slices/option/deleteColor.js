import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteColor = createAsyncThunk(
  "options/deleteColor",
  async (obj) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/optionRouter/deleteColor?id=${obj}`
    );
    return response;
  }
);
