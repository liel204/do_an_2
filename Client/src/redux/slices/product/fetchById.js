// src/features/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; // Cần cài đặt axios: npm install axios

// Giả sử đây là một API giả để lấy sản phẩm
const fetchProductById = async (id) => {
  // --- CODE CŨ (MOCK DATA) ---
  // const mockProducts = [
  //   { id: 1, name: "Product 1", price: 100 },
  //   { id: 2, name: "Product 2", price: 200 },
  //   { id: 3, name: "Product 3", price: 300 },
  // ];
  // return mockProducts.find((product) => product.id === id);
  
  // --- CODE MỚI (GỌI API THỰC TẾ) ---
  // Thay đổi URL dưới đây thành địa chỉ API backend thực tế của bạn
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
  if (!response.ok) {
     throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

// Async thunk để lấy các sản phẩm dựa trên danh sách id
export const fetchProductsByIds = createAsyncThunk(
  "products/fetchByIds",
  async (ids) => {
    const products = await Promise.all(ids.map((id) => fetchProductById(id)));
    return products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // Mảng chứa các sản phẩm
    status: "idle", // Trạng thái của việc fetch sản phẩm
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Lưu các sản phẩm đã fetch được
      })
      .addCase(fetchProductsByIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
