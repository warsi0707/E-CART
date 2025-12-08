import {createAsyncThunk} from "@reduxjs/toolkit"
const api = import.meta.env.VITE_BACKEND_URL;

export const signinThunk =createAsyncThunk('fetch/signin', async(payload, {rejectWithValue})=>{
    try{
        const email = payload.email
        const password = payload.password
        const response = await fetch(`${api}/api/v1/admin/signin`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const productsThunk =createAsyncThunk('fetch/products', async(_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/api/v1/admin/products`,{
            headers: {
                token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const ordersThunk =createAsyncThunk('fetch/orders', async(_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/api/v1/admin/orders`,{
            headers: {
                token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const sellersThunk =createAsyncThunk('fetch/sellers', async(_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/api/v1/admin/sellers`,{
            headers: {
                token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const usersThunk =createAsyncThunk('fetch/users', async(_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/api/v1/admin/users`,{
            headers: {
                token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const getAllStatsThunk = createAsyncThunk("fetc/getStats", async(_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/api/v1/admin/all-stats`,{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})