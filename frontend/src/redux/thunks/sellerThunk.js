import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendUrl } from "../../utils/Backendurl";
import toast from "react-hot-toast";

export const postProductThunk = createAsyncThunk('fetch/postProduct', async(formData, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/api/v1/seller/product`,{
            method: 'POST',
            headers: {
                token: localStorage.getItem('token')
            },
            body:formData
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.message)
            return result
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const getSellerProductThunk = createAsyncThunk('fetch/getSellerProducts', async(_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/api/v1/seller/products`,{
            headers: {
                token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const removeProductThunk = createAsyncThunk('fetch/removeProduct', async(id, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/api/v1/seller/product/${id}`,{
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.message)
            return result
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const updateStatusThunk = createAsyncThunk('fetch/updateStatus', async({id,status}, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/api/v1/seller/product/status/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json",
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({status})
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.message)
            return result
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const filterProductThunk = createAsyncThunk('fetch/filter', async(category, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/api/v1/seller/product/filter?category=${category}`,{
            headers: {
                token: localStorage.getItem('token'),
            }
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }
    }catch(error){
        return rejectWithValue(error)
    }
})