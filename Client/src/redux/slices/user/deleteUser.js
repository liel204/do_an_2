import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk(
  "categorys/deleteUser",
  async ({ id }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/userRouter/deleteObj?id=${id}`
    );
    return response;
  }
);
