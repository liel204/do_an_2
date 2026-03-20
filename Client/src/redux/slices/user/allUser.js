import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/userRouter/getAll"
  );

  return response.data.data;
});

const initialState = {
  listUsers: [],
  isLoading: true,
  isError: false,
};

export const allUser = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allUser.reducer;
