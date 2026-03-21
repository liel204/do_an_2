import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk(
  "categorys/updateUser",
  async (obj) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/userRouter/updateObj`,
      obj
    );
    return response;
  }
);
