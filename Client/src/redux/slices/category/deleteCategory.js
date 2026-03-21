import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const deleteCategory = createAsyncThunk(
  "categorys/deleteCategory",
  async ({ id }) => {
    const response = await axios.delete(
      `https://do-an-2-tffk.onrender.com/api/CategoryRouter/deleteObj?id=${id}`,
      {
        headers: {
          token: jwtDecode(localStorage.getItem("token")).User_Role,
        },
      }
    );
    return response;
  }
);
