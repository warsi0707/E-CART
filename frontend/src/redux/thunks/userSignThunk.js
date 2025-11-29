import { BackendUrl } from "/src/utils/Backendurl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const userSigninThunk = createAsyncThunk('fetch/signin', async({email, password, confirmPassword}, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/auth/signin`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, confirmPassword})
        })
       const result = await response.json()
        if(response.status ==200){
             toast.success(result.message)
             return result
        }else{
            toast.error(result.error)
            return rejectWithValue(result.errors)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const userSignUpThunk = createAsyncThunk('fetch/signup', async({email,role, password, firstName, lastName,mobile}, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/auth/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password,role, firstName, lastName,mobile})
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
export const postAddressThunk = createAsyncThunk('fetch/postAddress', async({locality, city,country,pin}, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/user/address`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify({locality, city,country,pin})
        })
       const result = await response.json()
       console.log(result)
        if(response.status ==200){
             return result
        }else{
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const getAddressThunk = createAsyncThunk('fetch/getAddress', async(_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/user/address`,{
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
export const deleteAddressThunk = createAsyncThunk('fetch/deleteAddress', async(id, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/user/address/${id}`,{
            method: 'DELETE',
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
