import { createSlice } from "@reduxjs/toolkit";
import { getAllStatsThunk, ordersThunk, productsThunk, sellersThunk, signinThunk, usersThunk } from "./adminThunks";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: JSON.parse(localStorage.getItem('admin')) || {},
        token: localStorage.getItem('token') || "",
        isAuthencticated: false,
        loading: false,
        products: {
            items: [],
            loading: false
        },
        orders: {
            items: [],
            loading: false
        },
        error: {},
        sellers: [],
        users: [],
        allStats: {
            loading: false,
            stats: {}
        }
    },
    reducers: {
        verifyUser: (state, action)=>{
            const token = localStorage.getItem('token')
            const admin = JSON.parse(localStorage.getItem('admin'))
            if(token && Object.keys(admin).length >0){
                state.isAuthencticated = true
            }
        },
        logOut: (state)=>{
            const token = localStorage.getItem('token')
            const admin = JSON.parse(localStorage.getItem('admin'))
            if(token && Object.keys(admin).length >0){
                state.isAuthencticated = false
                state.token = ""
                state.admin = {}
            }
            localStorage.removeItem('token')
            localStorage.removeItem('admin')
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(signinThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(signinThunk.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(signinThunk.fulfilled, (state, action)=>{
            if(action.payload.token && Object.keys(action.payload.admin).length >=0) {
                state.isAuthencticated = true
                state.token = action.payload.token
                state.admin = action.payload.admin
            }
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('admin', JSON.stringify(state.admin))
        })
        .addCase(productsThunk.pending, (state)=>{
            state.products.loading = true
        })
        .addCase(productsThunk.rejected, (state, action)=>{
            state.products.loading = false
        })
        .addCase(productsThunk.fulfilled, (state, action)=>{
            state.products.loading = false
            state.products.items = action.payload.products
        })
        .addCase(ordersThunk.pending, (state)=>{
            state.orders.loading = true
        })
        .addCase(ordersThunk.rejected, (state, action)=>{
            state.orders.loading = false
        })
        .addCase(ordersThunk.fulfilled, (state, action)=>{
            state.orders.loading = false
            state.orders.items = action.payload.orders
        })
         .addCase(sellersThunk.pending, (state)=>{
            state.productLoading = true
        })
        .addCase(sellersThunk.rejected, (state, action)=>{
            state.productLoading = false
            state.error = action.payload
        })
        .addCase(sellersThunk.fulfilled, (state, action)=>{
            state.productLoading = false
            state.sellers = action.payload.sellers
        })
         .addCase(usersThunk.pending, (state)=>{
            state.productLoading = true
        })
        .addCase(usersThunk.rejected, (state, action)=>{
            state.productLoading = false
            state.error = action.payload
        })
        .addCase(usersThunk.fulfilled, (state, action)=>{
            state.productLoading = false

            state.users = action.payload.users
        })
        .addCase(getAllStatsThunk.pending, (state)=>{
            state.allStats.loading = true
        })
        .addCase(getAllStatsThunk.rejected, (state, action)=>{
            state.allStats.loading = false
        })
        .addCase(getAllStatsThunk.fulfilled, (state,action)=>{
            state.allStats.loading = false
            state.allStats.stats = action.payload.stats
        })
    }
})
export const {verifyUser,logOut} = adminSlice.actions;
const adminReducer = adminSlice.reducer;
export default adminReducer;