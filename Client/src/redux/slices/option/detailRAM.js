import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detailRAM = createAsyncThunk("options/detailRAM", async (id) => {
  const response = await axios.get(
    `https://do-an-2-tffk.onrender.com/api/optionRouter/detailRAM?id=${id}`
  );
  return response;
});
