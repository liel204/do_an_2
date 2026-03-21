import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const deleteCategory = createAsyncThunk(
  "categorys/deleteCategory",
  async ({ id }) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/CategoryRouter/deleteObj?id=${id}`,
      {
        headers: {
          token: jwtDecode(localStorage.getItem("token")).User_Role,
        },
      }
    );
    return response;
  }
);
