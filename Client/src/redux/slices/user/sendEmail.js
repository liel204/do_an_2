import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkEmail = createAsyncThunk(
  "users/checkEmail",
  async (email) => {
    const res = await axios.post(
      `http://localhost:8000/api/userRouter/checkEmail`,
      { User_Email: email }
    );
    return res;
  }
);

export const forgotPass = createAsyncThunk(
  "users/forgotPass",
  async ({ User_Email, User_Password }) => {
    const res = await axios.put(
      `http://localhost:8000/api/userRouter/updatePass`,
      { User_Email: User_Email, User_Password: User_Password }
    );
    return res;
  }
);

export const sendEmail = createAsyncThunk("users/sendEmail", async (email) => {
  const res = await axios.post(
    `http://localhost:8000/api/sendEmail/sendEmail?email=${email}`
  );
  return res;
});