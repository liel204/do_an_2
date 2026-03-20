import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const addNewPayment = createAsyncThunk(
  "users/addNewPayment",
  async ({ id, Oder_TotalPrice, Payment_Method }) => {
    const response = await axios.post(
      "http://localhost:8000/api/PaymentRouter/addnew",
      {
        id: id,
        Payment_Method: Payment_Method,
        Oder_TotalPrice: Oder_TotalPrice,
        UserID: jwtDecode(localStorage.getItem("token")).id,
      }
    );
    return response.data.data;
  }
);

export const getPrice = createAsyncThunk(
  "users/getPrice",
  async (app_trans_id) => {
    const response = await axios.post(
      "http://localhost:8000/api/OderRouter/getSumForPayment",
      {
        app_trans_id: parseInt(app_trans_id),
      }
    );
    return response.data.data;
  }
);
