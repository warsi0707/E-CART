import {createSlice} from "@reduxjs/toolkit"
import { cancelOrderThunk, deleteAddressThunk, getAddressThunk, getOrdersThunk, orderThunk, postAddressThunk, userSigninThunk, userSignUpThunk } from "../thunks/userSignThunk"
import toast from "react-hot-toast"


const cartItems = JSON.parse(localStorage.getItem('carts')) || []
const finalCart = JSON.parse(localStorage.getItem('finalCart')) || []

const userSlice = createSlice({
    name: 'user',
    initialState : {
        isDarkTheme: JSON.parse(localStorage.getItem('isDark')) || false,
        user: {
            loading: false,
            items: JSON.parse(localStorage.getItem('user')) || null,
            token: localStorage.getItem('token'),
            isAuthenticated: false,
        },
        orders: {
            items: [],
            loading: false
        },
        address: {
            addressLoading: false,
            items: []
        },
        carts: cartItems.map((cart)=> ({...cart, quantity:cart.quantity, amount:cart.amount})),
        finalCart : localStorage.getItem('finalCartAmmount') || null,
    },  
    reducers: {
        authVerify: (state)=>{
            const token = localStorage.getItem('token') || null
            const user = JSON.parse(localStorage.getItem('user'))
            if(token && token.length >0){
                state.user.isAuthenticated = true
                state.user.items = user
            }
        },
        userLogout :(state)=>{
            const token = localStorage.getItem('token')
            if(token){
                state.user.isAuthenticated = false
                state.user.token = null
                state.user.items = {}
                toast.success("Logout")
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        },
        toggleTheme: (state, action)=>{
            const dark = JSON.parse(localStorage.getItem('isDark')) 
               if(dark){
                state.isDarkTheme = false
                 document.documentElement.classList.remove("dark")
                 localStorage.setItem('isDark', false)
               }else{
                state.isDarkTheme = "true"
                 document.documentElement.classList.add("dark")
                 localStorage.setItem('isDark', true)
               }  
        },
        getCart: (state, action)=>{
            const items = JSON.parse(localStorage.getItem("carts"))
            const final = JSON.parse(localStorage.getItem('finalCart'))
            state.carts = items
            state.finalCart = final
        },
        addToCart: (state,action)=>{
            const items = action.payload
            const existing = state.carts.find((e)=>e._id === items._id)
            if(existing){
               existing.quantity +=1
               existing.amount = existing.quantity * existing.price
               toast.success("Quantity increase")
            }else{
                state.carts.push({...items, quantity:1, amount:items.price})
                toast.success("Item added to cart")
            } 
            let finalPrice = state.carts.reduce((total, item)=> total + item.amount,0)           
            state.finalCart = finalPrice
            localStorage.setItem('finalCart', JSON.stringify(finalPrice))
            localStorage.setItem('carts', JSON.stringify(state.carts))         
        },
        removeCartItem: (state, action)=>{
            state.carts = state.carts.filter((item)=> item._id !== action.payload)
            let finalPrice = state.carts.reduce((total, item)=> total + item.amount,0)           
            state.finalCart = finalPrice
            localStorage.setItem('finalCart', JSON.stringify(finalPrice))
            localStorage.setItem("carts", JSON.stringify(state.carts))
        },
        increaseQnt: (state, action)=>{
            const existing = state.carts.find((item)=> item._id === action.payload)
            if(existing){
                existing.quantity +=1
                existing.amount = existing.quantity * existing.price
            }
            let finalPrice = state.carts.reduce((total, item)=> total + item.amount,0)           
            state.finalCart = finalPrice
            localStorage.setItem('finalCart', JSON.stringify(finalPrice))
            localStorage.setItem("carts", JSON.stringify(state.carts))
        },
        decreaseQnt: (state, action)=>{
            const existing = state.carts.find((item)=> item._id === action.payload)
            if(existing){
                existing.quantity -=1
                if(existing.quantity <=0){
                    state.carts =state.carts.filter((item)=> item._id !== action.payload)
                }
                existing.amount = existing.quantity * existing.price
            }
            let finalPrice = state.carts.reduce((total, item)=> total + item.amount,0)           
            state.finalCart = finalPrice
            localStorage.setItem('finalCart', JSON.stringify(finalPrice))
            localStorage.setItem("carts", JSON.stringify(state.carts))
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(userSigninThunk.pending, (state)=>{
            state.user.loading = true
        })
        .addCase(userSigninThunk.rejected, (state, action)=>{
            toast.error(action.payload)
            state.user.loading = false
        })
        .addCase(userSigninThunk.fulfilled, (state, action)=>{
            state.user.loading = false
            state.user.isAuthenticated = true
            state.user.items = action.payload.user
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        })
        .addCase(userSignUpThunk.pending, (state)=>{
            state.user.loading = true
        })
        .addCase(userSignUpThunk.rejected, (state, action)=>{
            toast.error(action.payload.error)
            state.user.loading = false
        })
        .addCase(userSignUpThunk.fulfilled, (state, action)=>{
           toast.success(action.payload.message)
           state.user.loading = false
        })
        .addCase(getAddressThunk.pending, (state)=>{
            state.address.addressLoading = true
        })
        .addCase(getAddressThunk.fulfilled, (state ,action)=>{
            state.address.addressLoading = false
            state.address.items = action.payload.address
        })
        .addCase(deleteAddressThunk.rejected, (state)=>{
            state.address.addressLoading = false
        })
        .addCase(deleteAddressThunk.fulfilled, (state ,action)=>{
            state.address.addressLoading = false
            toast.success(action.payload.message)
            state.address.items = state.address.items.filter((item)=> item._id !==action.payload.address._id)
        })
        .addCase(postAddressThunk.rejected, (state)=>{
            state.address.addressLoading = false
        })
        .addCase(postAddressThunk.fulfilled, (state ,action)=>{
            state.address.addressLoading = false
            state.address.items = [...state.address.items, action.payload.address]
        })
        .addCase(orderThunk.rejected, (action)=>{
        })
        .addCase(orderThunk.pending, (state)=>{
            state.orders.loading = true
        })
        .addCase(orderThunk.fulfilled, (state ,action)=>{
            state.orders.loading = false
            state.carts = []
            state.finalCart= []
            localStorage.removeItem('carts')
            localStorage.removeItem('finalCartAmmount')
            // state.adresses = [...state.adresses, action.payload.address]
        })
        .addCase(getOrdersThunk.pending, (state)=>{
            state.orders.loading = true
        })
        .addCase(getOrdersThunk.rejected, (state)=>{
            state.orders.loading = false
            toast.error("Failed")
        })
        .addCase(getOrdersThunk.fulfilled, (state ,action)=>{
            state.orders.loading = false
            state.orders.items = action.payload.orders
        })
        .addCase(cancelOrderThunk.rejected, (state, action)=>{
        })
        .addCase(cancelOrderThunk.fulfilled, (state, action)=>{
            toast.success(action.payload.message)
            state.orders.items = state.orders.items.filter((item)=> item._id !== action.payload.order._id)
        })
    }
})
export const {authVerify,userLogout,toggleTheme,addToCart,getCart,removeCartItem,increaseQnt,decreaseQnt} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;