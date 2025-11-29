import { json } from "express";
import Product from "../models/ProductModel.js";
import cloudinary from "../utils/Cloudinary.js";


export const postProduct = async (req, res) => {
  const { title, description, price, images, category, discount, stock } = req.body;

  // const imageUrls = req.files.map((file)=> file.filename)

  // const uploadsImage = await new Promise((resolve, reject)=>{
  //   cloudinary.uploader.upload_stream((error,uploadsImage)=>{
  //       if(error){
  //           return reject(error)
  //       }
  //       return resolve(uploadsImage)
  //   }).end()
  // })
  // console.log(uploadsImage)

  try {
    if (!title || !price  || !stock) {
      return res.status(404).json({
        error: "All input required",
      });
    }
    const imageUrls = req.files.map((image)=> image.path)
    const newProduct = await Product.create({
      title,
      description,
      price,
      images:imageUrls,
      category,
      discount,
      stock,
      ownerId: req.user,
    });
    return res.json({
      message: "Product posted",
      product: newProduct,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const getProducts = async(req,res)=>{
  try {
    const products = await Product.find({
      ownerId: req.user
    });
    return res.json(products);
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
}
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.json(product);
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, images, category, discount, stock } =
    req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      title,
      description,
      price,
      images,
      category,
      discount,
      stock,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {

    const deletedProduct = await Product.findByIdAndDelete({_id:id, ownerId: req.user});
    return res.json({
      message: "Product deleted",
      product: deletedProduct,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const updateStatus =async(req, res)=>{
  try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true})

    return res.json({
      message: "Updated",
      product: product
    })
  }catch(error){
    return res.status(404).json({
      error : error
    })
  }
}
export const filterProduct =async(req, res)=>{
  const category = req.query.category
  try{
    const products = await Product.find({
      $and: [
        {category: {$eq:category}},
        {ownerId: {$eq: req.user}}
      ]
    })
    return res.json({
      products: products
    })
  }catch(error){
    return res.status(404).json({
      error : error
    })
  }
}
