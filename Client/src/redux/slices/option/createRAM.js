import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createRAM = createAsyncThunk("options/createRAM", async (obj) => {
  const response = await axios.post(
    "https://do-an-2-tffk.onrender.com/api/optionRouter/addnewRAM",
    obj
  );
  return response;
});
