import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk(
  "categorys/updateUser",
  async (obj) => {
    const response = await axios.put(
      "http://localhost:8000/api/userRouter/updateObj",
      obj
    );
    return response;
  }
);
