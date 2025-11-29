import {configureStore} from "@reduxjs/toolkit"
import productReducer from "../slices/productSlice";
import userReducer from "../slices/userSlice";
import sellerReducer from "../slices/sellerSlice";


const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        seller: sellerReducer
    }
})
export default store;