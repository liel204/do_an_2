import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProductsCaterogyID = createAsyncThunk(
  "products/getAllProductsCaterogyID",
  async (CategoryID) => {
    const response = await axios.get(
      `http://localhost:8000/api/ProductRouter/getAllWithCaterogyID?CategoryID=${CategoryID}`
    );
    return response.data.data;
  }
);

const initialState = {
  listproductsCaterogyID: [],
  sort: "Product_Name",
  isLoading: true,
  isError: false,
};

export const allProductCaterogyID = createSlice({
  name: "productCategory",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsCaterogyID.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllProductsCaterogyID.fulfilled, (state, action) => {
      state.listproductsCaterogyID = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllProductsCaterogyID.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setSort } = allProductCaterogyID.actions;
export default allProductCaterogyID.reducer;
