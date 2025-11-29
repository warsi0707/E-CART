import Product from "../models/ProductModel.js"

export const getProducts =async(req , res)=>{
    try{
        const products = await Product.find({
            $and: [
                {status: {$eq: "ACTIVE"}},
                {stock: {$gt: 0}}
            ]
        })
        return res.json(products)
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const getProductById = async(req, res)=>{
    const {id} = req.params;
    try{
        const product = await Product.findById(id).populate('ownerId', 'username role')
        if(!product){
            return res.status(404).json({
                error: "Not found"
            })
        }
        return res.json(product)
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const filterProcuct=async(req,res)=>{
    const {query} = req.query;
    try{
        const products = await Product.find({
            $or: [
                {title: { $regex: query, $options: "i" }},
                {description: { $regex: query, $options: "i" }},
                {category: { $regex: query, $options: "i" }},
            ]
        })
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