import {createSlice} from "@reduxjs/toolkit"
import { getFilterProductsThunks, getProductsByIdThunks, getProductsThunks } from "../thunks/productsThunk"


const producSlice = createSlice({
    name: 'product',
    initialState : {
        products: [],
        detailproduct: {},
        productLoading: false
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getProductsThunks.pending, (state)=>{
            state.productLoading = true
        })
        .addCase(getProductsThunks.rejected, (state, action)=>{
            state.productLoading = false
        })
        .addCase(getProductsThunks.fulfilled, (state, action)=>{
            state.productLoading = false
            state.products = action.payload
        })
        .addCase(getProductsByIdThunks.pending, (state)=>{
            state.productLoading = true
        })
        .addCase(getProductsByIdThunks.rejected, (state, action)=>{
            state.productLoading = false
        })
        .addCase(getProductsByIdThunks.fulfilled, (state, action)=>{
            state.productLoading = false
            state.detailproduct = action.payload
        })
        .addCase(getFilterProductsThunks.pending, (state)=>{
            state.productLoading = true
        })
        .addCase(getFilterProductsThunks.rejected, (state, action)=>{
            state.productLoading = false
        })
        .addCase(getFilterProductsThunks.fulfilled, (state, action)=>{
            state.productLoading = false
            state.products = action.payload.products
        })
    }
})

const productReducer = producSlice.reducer;
export default productReducer