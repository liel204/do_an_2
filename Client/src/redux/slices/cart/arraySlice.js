// src/features/arraySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array to store the data
};

const arraySlice = createSlice({
  name: "array",
  initialState,
  reducers: {
    // Add item to the array
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    // Remove item from the array by index
    removeItem: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
    // Update an item in the array by index
    updateItem: (state, action) => {
      const { index, newItem } = action.payload;
      state.items[index] = newItem;
    },
    // Clear the array
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateItem, clearItems } =
  arraySlice.actions;

export default arraySlice.reducer;
