import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getAllOder = createAsyncThunk("oders/getAllOder", async () => {
  const response = await axios.get(
    `http://localhost:8000/api/OderRouter/getAll?UserID=${
      jwtDecode(localStorage.getItem("token")).id
    }`
  );
  return response.data.data;
});

const initialState = {
  listoder: [],
  isLoading: true,
  isError: false,
};

export const allOder = createSlice({
  name: "getAllOder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOder.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllOder.fulfilled, (state, action) => {
      state.listoder = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllOder.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allOder.reducer;
