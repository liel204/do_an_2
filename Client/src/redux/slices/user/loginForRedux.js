import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getLoginForRedux = createAsyncThunk(
  "users/loginForRedux",
  async (obj) => {
    let decoded = jwtDecode(obj);
    const res = await axios.get(
      `http://localhost:8000/api/userRouter/getDetail?id=${decoded.id}`
    );
    return res.data.data;
  }
);

const initialState = {
  userIsloginForRedux: {},
  status: "",
};

export const loginForRedux = createSlice({
  name: "loginForRedux",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoginForRedux.pending, (state, action) => {
      state.status = "loginForReduxg";
    });
    builder.addCase(getLoginForRedux.fulfilled, (state, action) => {
      state.status = "success";
      state.userIsloginForRedux = action.payload;
    });
    builder.addCase(getLoginForRedux.rejected, (state, action) => {
      state.status = "error";
      state.userIsloginForRedux = {};
    });
  },
});

export default loginForRedux.reducer;
