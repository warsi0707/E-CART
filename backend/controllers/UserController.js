import Address from "../models/AddressMoel.js";
import Order from "../models/OrderModel.js";

export const postAddress =async(req, res)=>{
    const {locality,city,country,pin} = req.body;
    console.log(locality,city,country,pin)
    try{
        // if(!locality || !city || !pin){
        //     return
        // }
        const address = await Address.create({
            locality,
            city,
            country,
            pin,
            user: req.user
        })
        return res.json({
            message: "Address added",
            address: address
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const getAddress = async(req, res)=>{
    try{
        const address = await Address.find({user: req.user})
        if(address.length<=0){
            return res.json({
                address: []
            })
        }
        return res.json({
            address: address
        })
    }catch(error){
        return res.status(404).json(error)
    }
}
export const deleteAddress = async(req,res)=>{
    const {id} = req.params;
    try{
        const address = await Address.findByIdAndDelete(id)
        if(!address){
            return res.status(404).json({
                error: 'Not found'
            })
        }
        return res.json({
            message: "Address removed",
            address: address
        })
    }catch(error){
        return res.status(404).json(error)
    }
}
export const makeOrder=async(req, res)=>{
    const {items, totalAmount, address} = req.body;
    console.log(items, totalAmount, address)
    try{
        const newOrder = await Order.create({
            user: req.user,
            address,
            items: items,
            totalAmount
        })
        return res.json({
            message: "Order placed",
            order: newOrder
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}