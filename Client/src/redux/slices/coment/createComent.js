import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const createComent = createAsyncThunk(
  "categorys/createComent",
  async (obj) => {
    obj.UserID = jwtDecode(localStorage.getItem("token")).id;
    const response = await axios.post(
      "http://localhost:8000/api/comentRouter/addnew",
      obj
    );
    return response;
  }
);
