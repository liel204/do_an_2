import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detailRAM = createAsyncThunk("options/detailRAM", async (id) => {
  const response = await axios.get(
    `http://localhost:8000/api/optionRouter/detailRAM?id=${id}`
  );
  return response;
});
