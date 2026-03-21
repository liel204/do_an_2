import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteRAM = createAsyncThunk("options/deleteRAM", async (obj) => {
  const response = await axios.delete(
    `https://do-an-2-tffk.onrender.com/api/optionRouter/deleteRAM?id=${obj}`
  );
  return response;
});
