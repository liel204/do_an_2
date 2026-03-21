import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk(
  "categorys/updateUser",
  async (obj) => {
    const response = await axios.put(
      "https://do-an-2-tffk.onrender.com/api/userRouter/updateObj",
      obj
    );
    return response;
  }
);
