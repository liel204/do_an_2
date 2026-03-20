import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createRAM = createAsyncThunk("options/createRAM", async (obj) => {
  const response = await axios.post(
    "http://localhost:8000/api/optionRouter/addnewRAM",
    obj
  );
  return response;
});
