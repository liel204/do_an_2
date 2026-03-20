import { configureStore } from "@reduxjs/toolkit";
import allProductReducer, { getAllProducts } from "./slices/product/allProduct";
import detailProductReducer from "./slices/product/detailProduct";
import allProductCategoryIDReducer from "./slices/product/allProductWithCaterogyID";
import allCartReducer from "./slices/cart/allCart";
import allOderReducer from "./slices/oder/allOder";
import allCategoryReducer, {
  getAllCategory,
} from "./slices/category/allCaterogy";
import { getLoginForRedux } from "./slices/user/loginForRedux";
import loginForReduxReducer from "./slices/user/loginForRedux";
import getColorReducer from "./slices/option/getAllColor";
import getMemoryReducer from "./slices/option/getAllMemory";
import resetDetailProductReducer from "./slices/product/resetDetailProduct";
import arrayReducer from "./slices/cart/arraySlice";
import fetchProductByIdReducer from "./slices/product/fetchById";
import getAllMemoryReducer from "./slices/option/getAllMemory";
import getAllColorReducer from "./slices/option/getAllColor";
import getPriceWithMemoryReducer from "./slices/option/getPriceWithMemory";
import searchReducer from "./slices/product/searchProduct";
import getAllUsersReducer from "./slices/user/allUser";
import ForRealTime from "./slices/ForRealTime/ForRealTime";
const store = configureStore({
  reducer: {
    allProductStore: allProductReducer,
    detailProductStore: detailProductReducer,
    allCartStore: allCartReducer,
    allOderStore: allOderReducer,
    allCategoryStore: allCategoryReducer,
    allProductCaterogyIDStore: allProductCategoryIDReducer,
    loginForReduxStore: loginForReduxReducer,
    getColorStore: getColorReducer,
    getMemoryStore: getMemoryReducer,
    resetDetailProductStore: resetDetailProductReducer,
    array: arrayReducer,
    fetchProductByIdStore: fetchProductByIdReducer,
    getAllMemoryStore: getAllMemoryReducer,
    getAllColorStore: getAllColorReducer,
    getPriceWithMemoryStore: getPriceWithMemoryReducer,
    getAllUsersStore: getAllUsersReducer,
    search: searchReducer,
    data: ForRealTime,
  },
});

//tự động khi chạy ứng dụng
store.dispatch(getAllProducts());
store.dispatch(getAllCategory());

// ghi nhớ đăng nhập
if (localStorage.getItem("token") != null) {
  store.dispatch(getLoginForRedux(localStorage.getItem("token")));
}

export default store;
