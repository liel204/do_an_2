import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateOrder = createAsyncThunk(
  "options/updateOrder",
  async (obj) => {
    const response = await axios.put(
      `http://localhost:8000/api/OderRouter/updateObj`,
      obj
    );
    return response;
  }
);
