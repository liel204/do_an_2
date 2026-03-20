import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";
import { getLoginForRedux } from "./loginForRedux";

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const res = await axios.post(
    `http://localhost:8000/api/userRouter/logoutUser`
  );
  if (res.data.status === "OK") {
    localStorage.setItem("Signinhere", localStorage.getItem("token"));
    localStorage.removeItem("token");
    store.dispatch(getLoginForRedux());
  }
  return res.data;
});
