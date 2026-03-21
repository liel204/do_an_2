import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateOrder = createAsyncThunk(
  "options/updateOrder",
  async (obj) => {
    const response = await axios.put(
      `https://do-an-2-tffk.onrender.com/api/OderRouter/updateObj`,
      obj
    );
    return response;
  }
);
