import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const updateCategory = createAsyncThunk(
  "categorys/updateCategory",
  async ({ id, Category_Name }) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/CategoryRouter/updateObj?id=1`,
      {
        id: id,
        Category_Name: Category_Name,
      },
      {
        headers: {
          token: jwtDecode(localStorage.getItem("token")).User_Role,
        },
      }
    );
    return response;
  }
);
