import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateRAM = createAsyncThunk("options/updateRAM", async (obj) => {
  const response = await axios.put(
    `https://do-an-2-tffk.onrender.com/api/optionRouter/updateRAM`,
    obj
  );
  return response;
});
