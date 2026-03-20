import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detailColor = createAsyncThunk(
  "options/detailColor",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/optionRouter/detailColor?id=${id}`
    );
    return response;
  }
);
