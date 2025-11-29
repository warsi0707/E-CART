import { createSlice } from "@reduxjs/toolkit";
import { filterProductThunk, getSellerProductThunk, postProductThunk, removeProductThunk, updateStatusThunk } from "../thunks/sellerThunk";

const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        products :[],
        loading: false
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(postProductThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(postProductThunk.rejected, (state, action)=>{
            state.loading = false
        })
        .addCase(postProductThunk.fulfilled, (state, action)=>{
            state.loading = false
            state.products = [...state.products, action.payload.product]
        })
        .addCase(getSellerProductThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(getSellerProductThunk.rejected, (state)=>{
            state.loading = false
        })
        .addCase(getSellerProductThunk.fulfilled, (state,action)=>{
            state.loading = false
            state.products = action.payload
        })
        .addCase(removeProductThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(removeProductThunk.rejected, (state)=>{
            state.loading = false
        })
        .addCase(removeProductThunk.fulfilled, (state,action)=>{
            state.loading = false
            state.products = state.products.filter((product)=> product._id !== action.payload.product._id)
        })
        .addCase(updateStatusThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(updateStatusThunk.rejected, (state)=>{
            state.loading = false
        })
        .addCase(updateStatusThunk.fulfilled, (state,action)=>{
            state.loading = false
            state.products.find((product)=> {
                if(product._id === action.payload.product._id){
                    product.status = action.payload.product.status 
                }
            })
        })
        .addCase(filterProductThunk.rejected, (state,action)=>{
            state.loading = false
        })
        .addCase(filterProductThunk.fulfilled, (state,action)=>{
            state.loading = false
            state.products = action.payload.products
        })
    }
})

const sellerReducer = sellerSlice.reducer;
export default sellerReducer