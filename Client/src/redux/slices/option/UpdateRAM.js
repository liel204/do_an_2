import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateRAM = createAsyncThunk("options/updateRAM", async (obj) => {
  const response = await axios.put(
    `http://localhost:8000/api/optionRouter/updateRAM`,
    obj
  );
  return response;
});
