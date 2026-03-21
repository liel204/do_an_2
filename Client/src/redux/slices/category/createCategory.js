import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const createCategory = createAsyncThunk(
  "categorys/createCategory",
  async ({ Category_Name }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/CategoryRouter/addnew`,
      {
        Category_Name: Category_Name,
      },
      {
        headers: {
          token: jwtDecode(localStorage.getItem("token")).User_Role,
        },
      }
    );
    console.log("first", response);
    return response;
  }
);
