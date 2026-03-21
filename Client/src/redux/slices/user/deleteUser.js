import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk(
  "categorys/deleteUser",
  async ({ id }) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/userRouter/deleteObj?id=${id}`
    );
    return response;
  }
);
