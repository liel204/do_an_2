import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("users/signup", async (obj) => {
  const res = await axios.post(`http://localhost:8000/api/userRouter/addnew`, {
    User_Name: obj.name,
    User_Email: obj.email,
    User_Password: obj.pass,
  });
  return res.data;
});
