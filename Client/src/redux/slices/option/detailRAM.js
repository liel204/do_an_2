import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detailRAM = createAsyncThunk("options/detailRAM", async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/optionRouter/detailRAM?id=${id}`
  );
  return response;
});
