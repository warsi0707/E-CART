import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ADMIN_JWT_SECRET } from "../config/Config.js"
import Order from "../models/OrderModel.js"
import Product from "../models/ProductModel.js"

export const singin =async(req,res)=>{
    const {email, password} = req.body
    try{
        const isAdmin = await User.findOne({email})
        if(!isAdmin){
            return res.status(404).json({
                error: "Incorrect email or password"
            })
        }
        if(isAdmin.role !== 'ADMIN'){
            return res.status(404).json({
                error: "Not admin"
            })
        }
        const isCompared = await bcrypt.compare(password, isAdmin.password)
        if(isAdmin && isCompared){
            const token = jwt.sign({
                user: isAdmin._id
            },ADMIN_JWT_SECRET)
            return res.json({
                token: token,
                admin: {
                    email: isAdmin.email,
                    firstName: isAdmin.firstName,
                    lastName: isAdmin.lastName,
                    mobile: isAdmin.mobile
                }
            })
        }
        return res.status(404).json({
            error: "Not found"
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const allOrders =async(req, res)=>{
    try{
        const orders = await Order.find({}).populate('user','firstName lastName').populate('items.product')
        if(orders.length <=0){
            return res.json({
                orders: []
            })
        }
        return res.json({
                orders: orders
            })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const allUsers =async(req, res)=>{
    try{
        const users = await User.find({role: 'USER'}, ('-password'))
        if(users.length <=0){
            return res.json({
                users: []
            })
        }
        return res.json({
                users: users
            })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const allSellers =async(req, res)=>{
    try{
        const sellers = await User.find({role: 'SELLER'},('-password'))
        if(sellers.length <=0){
            return res.json({
                sellers: []
            })
        }
        return res.json({
                sellers: sellers
            })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const products =async(req, res)=>{
    try{
        const products = await Product.find({}).populate('ownerId','email firstName lastName')
        if(products.length <=0){
            return res.json({
                products: []
            })
        }
        return res.json({
                products: products
            })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}

export const allStats = async(req,res)=>{
    try{
        const orders = await Order.find({})
        const products = await Product.find({})
        const sellers = await User.find({role: 'SELLER'},('-password'))
        const users = await User.find({role: 'USER'},('-password'))
        return res.json({
            stats: {
                orders: orders.length,
                products: products.length,
                sellers: sellers.length,
                users: users.length
            }
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}