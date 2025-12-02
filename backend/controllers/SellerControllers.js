import Product from "../models/ProductModel.js";
import cloudinary from "../utils/Cloudinary.js";
import Order from "../models/OrderModel.js";


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

  // const uploadPromises = req.files.map((file =>{
  //   return new Promise((resolve, reject)=>{
  //     const upload_stream = cloudinary.uploader.upload_stream((error, uploadResult)=>({
  //       folder: "uploads",
  //       resource_type: 'auto'
  //     }))
      
  //   })
  //   if(upload_stream.error){
  //       reject(error)
  //     }
  // }))
  // const results = await Promise.all(uploadPromises);
  // console.log(results)

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
export const getSellerOrders = async(req,res)=>{
  try{
    const products = await Product.find({ownerId: req.user})
    if(products.length <=0){
      return res.json({
        orders: []
      })
    }
    const orders = await Order.find({'items.product': {$in: products}}).populate('address user items.product', 'city locality pin price title images quantity firstName lastName')
    return res.json({
      orders: orders
    })
  }catch(error){
    return res.status(404).json({
      error: error
    })
  }
}
export const updateOrderStatus =async(req, res)=>{
  const {id} = req.params
  try{
    const orders = await Order.findByIdAndUpdate(id, req.body,{new: true})
    return res.json({
      order: orders
    })
  }catch(error){
    return res.status(404).json({
      error: error
    })
  }
}
export const sellerCancelOrder = async(req, res)=>{
  try{
    const order = await Order.findByIdAndDelete(req.params.id)
    return res.json(order)
  }catch(error){
    return res.status(404).json({
      error: error
    })
  }
}
