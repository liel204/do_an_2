import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteRAM = createAsyncThunk("options/deleteRAM", async (obj) => {
  const response = await axios.delete(
    `http://localhost:8000/api/optionRouter/deleteRAM?id=${obj}`
  );
  return response;
});
