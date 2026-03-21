import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteRAM = createAsyncThunk("options/deleteRAM", async (obj) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/optionRouter/deleteRAM?id=${obj}`
  );
  return response;
});
