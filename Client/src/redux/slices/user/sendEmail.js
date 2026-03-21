import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkEmail = createAsyncThunk(
  "users/checkEmail",
  async (email) => {
    const res = await axios.post(
      `https://do-an-2-tffk.onrender.com/api/userRouter/checkEmail`,
      { User_Email: email }
    );
    return res;
  }
);

export const forgotPass = createAsyncThunk(
  "users/forgotPass",
  async ({ User_Email, User_Password }) => {
    const res = await axios.put(
      `https://do-an-2-tffk.onrender.com/api/userRouter/updatePass`,
      { User_Email: User_Email, User_Password: User_Password }
    );
    return res;
  }
);

export const sendEmail = createAsyncThunk("users/sendEmail", async (email) => {
  const res = await axios.post(
    `https://do-an-2-tffk.onrender.com/api/sendEmail/sendEmail?email=${email}`
  );
  return res;
});