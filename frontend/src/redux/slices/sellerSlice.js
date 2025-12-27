import { createSlice } from "@reduxjs/toolkit";
import { filterProductThunk, getSellerOrderByIdThunk, getSellerProductThunk, postProductThunk, removeProductThunk, sellerCancelOrdersThunk, sellerOrdersStatusThunk, sellerOrdersThunk, updateStatusThunk } from "../thunks/sellerThunk";
import toast from "react-hot-toast";

const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        products :{
            products: [],
            productLoading: false
        },
        orders: {
            orders: [],
            ordersLoading: false
        },
        // loading: false
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(postProductThunk.pending, (state)=>{
            state.products.productLoading = true
        })
        .addCase(postProductThunk.rejected, (state, action)=>{
            state.products.productLoading = false
        })
        .addCase(postProductThunk.fulfilled, (state, action)=>{
            state.products.productLoading = false
            state.products.products = [...state.products.products, action.payload.product]
        })
        //Get sellers product
        .addCase(getSellerProductThunk.pending, (state)=>{
            state.products.productLoading = true
        })
        .addCase(getSellerProductThunk.rejected, (state)=>{
           state.products.productLoading = false
           toast.error("Failed to fetch products")
        })
        .addCase(getSellerProductThunk.fulfilled, (state,action)=>{
            state.products.productLoading = false
            state.products.products =action.payload
        })
        //Remove seller products
        .addCase(removeProductThunk.pending, (state)=>{
            state.products.productLoading = true
        })
        .addCase(removeProductThunk.rejected, (state)=>{
           state.products.productLoading = false
        })
        .addCase(removeProductThunk.fulfilled, (state,action)=>{
           state.products.productLoading = false
            state.products.products = state.products.products.filter((product)=> product._id !== action.payload.product._id)
        })
        //Update status
        .addCase(updateStatusThunk.pending, (state)=>{
           state.products.productLoading = true
        })
        .addCase(updateStatusThunk.rejected, (state)=>{
            state.products.productLoading = false
           toast.error("failed")
        })
        .addCase(updateStatusThunk.fulfilled, (state,action)=>{
           state.products.productLoading = false
            state.products.products.map((product)=> 
                product._id === action.payload.product._id?
                    {...product.status = action.payload.product.status }
                : product
            )
        })
        //Filter products
        .addCase(filterProductThunk.rejected, (state,action)=>{
             state.products.productLoading = false
           toast.error("failed")
        })
        .addCase(filterProductThunk.fulfilled, (state,action)=>{
            state.products.productLoading = false
            state.products.products = action.payload.products
        })
        .addCase(sellerOrdersThunk.pending, (state)=>{
            state.orders.ordersLoading = true  
        })
        .addCase(sellerOrdersThunk.rejected, (state)=>{
            state.orders.ordersLoading = false   
        })
        .addCase(sellerOrdersThunk.fulfilled, (state,action)=>{
            state.orders.ordersLoading = false
            state.orders.orders = action.payload.orders
        })
        .addCase(sellerOrdersStatusThunk.pending, (state)=>{
            state.orders.ordersLoading = true  
        })
        .addCase(sellerOrdersStatusThunk.rejected, (state)=>{
            state.orders.ordersLoading = false  
        })
        .addCase(sellerOrdersStatusThunk.fulfilled, (state,action)=>{
            state.orders.ordersLoading = false  
            state.orders.orders.find((item)=> {
                if(item._id === action.payload.order._id){
                    item.status = action.payload.order.status
                }
            })
        })
        .addCase(sellerCancelOrdersThunk.pending, (state)=>{
           state.orders.ordersLoading = true  
        })
        .addCase(sellerCancelOrdersThunk.rejected, (state)=>{
            state.orders.ordersLoading = false  
        })
        .addCase(sellerCancelOrdersThunk.fulfilled, (state,action)=>{
           state.orders.ordersLoading = false  
            state.orders.orders = state.orders.orders.filter((item)=> item._id !== action.payload._id)
        })
        .addCase(getSellerOrderByIdThunk.pending, (state)=>{
            state.orders.ordersLoading = true
        })
        .addCase(getSellerOrderByIdThunk.rejected, (state)=>{
            state.orders.ordersLoading = false
        })
        .addCase(getSellerOrderByIdThunk.fulfilled, (state, action)=>{
            state.orders.ordersLoading = false
            // state.orders.orders = action.payload.order
        })
    }
})

const sellerReducer = sellerSlice.reducer;
export default sellerReducer