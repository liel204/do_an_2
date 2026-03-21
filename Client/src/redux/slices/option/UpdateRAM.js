import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateRAM = createAsyncThunk("options/updateRAM", async (obj) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/optionRouter/updateRAM`,
    obj
  );
  return response;
});
