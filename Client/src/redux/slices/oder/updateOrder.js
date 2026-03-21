import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateOrder = createAsyncThunk(
  "options/updateOrder",
  async (obj) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/OderRouter/updateObj`,
      obj
    );
    return response;
  }
);
