import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";
import { getLoginForRedux } from "./loginForRedux";

export const loginUser = createAsyncThunk("users/login", async (obj) => {
  const res = await axios.post(
    `http://localhost:8000/api/userRouter/loginUser`,
    {
      User_Email: obj.email,
      User_Password: obj.pass,
    }
  );
  if (res && res.data.access_token !== undefined) {
    localStorage.setItem("token", res.data.access_token);
  }
  if (localStorage.getItem("token") != null) {
    store.dispatch(getLoginForRedux(localStorage.getItem("token")));
  }
  return res.data;
});
