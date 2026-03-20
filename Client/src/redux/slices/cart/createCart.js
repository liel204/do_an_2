//

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const createCart = createAsyncThunk(
  "carts/createCart",
  async ({ CartItem_Quantity, ProductID, ColorID, MemoryID }) => {
    const obj = {
      CartItem_Quantity: CartItem_Quantity,
      ProductID: ProductID,
      UserID: jwtDecode(localStorage.getItem("token")).id,
      MemoryID: MemoryID,
      ColorID: ColorID,
    };
    console.log("first", obj);
    const response = await axios.post(
      "http://localhost:8000/api/cartItemRouter/addnew",
      obj
    );
    if (response.data.message === "Create successful") {
      alert("Create successful");
    }
    return response.data.message;
  }
);
