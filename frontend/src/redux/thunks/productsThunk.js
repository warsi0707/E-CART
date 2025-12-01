import { BackendUrl } from "/src/utils/Backendurl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsThunks = createAsyncThunk('fetch/products', async(_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/product`)
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const getProductsByIdThunks = createAsyncThunk('fetch/productsById', async(id, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/product/${id}`)
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const getFilterProductsThunks = createAsyncThunk('fetch/filterProduct', async(query, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/product/filter?query=${query}`)
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})