import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";
import { getLoginForRedux } from "./loginForRedux";

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const res = await axios.post(
    `https://do-an-2-tffk.onrender.com/api/userRouter/logoutUser`
  );
  if (res.data.status === "OK") {
    localStorage.setItem("Signinhere", localStorage.getItem("token"));
    localStorage.removeItem("token");
    store.dispatch(getLoginForRedux());
  }
  return res.data;
});
