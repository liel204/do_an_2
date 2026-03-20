import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const createOder = createAsyncThunk(
  "oders/createOder",
  async ({
    CartItemID,
    Payment,
    Oder_AddressShipping,
    FullName,
    Phone,
    Note,
    app_trans_id,
    Oder_Status,
  }) => {
    const temp = await axios.get(
      `http://localhost:8000/api/CartItemRouter/getDetail?id=${CartItemID}`
    );
    const obj = {
      Oder_TotalPrice: temp.data.data[0].TotalPriceItem,
      Oder_AddressShipping: Oder_AddressShipping,
      ShippingID: 1,
      Oder_Status: Oder_Status,
      CartItemID: CartItemID,
      Payment: Payment,
      UserID: jwtDecode(localStorage.getItem("token")).id,
      FullName: FullName,
      Phone: Phone,
      Note: Note,
      app_trans_id: app_trans_id,
    };
    console.log("first", obj);
    const response = await axios.post(
      "http://localhost:8000/api/OderRouter/addnew",
      obj
    );
    console.log("first", response);
    return response.data.message;
  }
);
