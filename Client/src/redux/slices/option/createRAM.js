import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createRAM = createAsyncThunk("options/createRAM", async (obj) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/optionRouter/addnewRAM`,
    obj
  );
  return response;
});
