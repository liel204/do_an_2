// // features/search/searchSlice.js
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import Fuse from "fuse.js";

// export const getAllProducts = createAsyncThunk(
//   "products/getAllProducts",
//   async () => {
//     const response = await axios.get(
//       "http://localhost:8000/api/productRouter/getAll"
//     );

//     return response.data.data;
//   }
// );

// const initialState = {
//   items: [],
//   searchTerm: "",
// };

// const searchSlice = createSlice({
//   name: "search",
//   initialState,
//   reducers: {
//     setSearchTerm: (state, action) => {
//       state.searchTerm = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(getAllProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(getAllProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setSearchTerm } = searchSlice.actions;

// export const selectFilteredData = (state) => {
//   const searchTerm = state.search.searchTerm.toLowerCase();
//   return state.search.items.filter((item) =>
//     item.Product_Name.toLowerCase().includes(searchTerm)
//   );
// };

// export default searchSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Fuse from "fuse.js";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/productRouter/getAll"
    );

    return response.data.data;
  }
);

const initialState = {
  items: [],
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = searchSlice.actions;

export const selectFilteredData = (state) => {
  const { items, searchTerm } = state.search;

  if (!searchTerm) return items;

  const fuse = new Fuse(items, {
    keys: ["Product_Name"],
    threshold: 0.3,
  });

  const results = fuse.search(searchTerm);

  return results.map((result) => result.item);
};

export default searchSlice.reducer;
