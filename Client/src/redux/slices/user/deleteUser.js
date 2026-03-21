import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk(
  "categorys/deleteUser",
  async ({ id }) => {
    const response = await axios.delete(
      `https://do-an-2-tffk.onrender.com/api/userRouter/deleteObj?id=${id}`
    );
    return response;
  }
);
