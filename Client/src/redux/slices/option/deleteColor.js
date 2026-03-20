import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteColor = createAsyncThunk(
  "options/deleteColor",
  async (obj) => {
    const response = await axios.delete(
      `http://localhost:8000/api/optionRouter/deleteColor?id=${obj}`
    );
    return response;
  }
);
