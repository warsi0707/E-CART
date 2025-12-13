import Address from "../models/AddressMoel.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

export const postAddress = async (req, res) => {
  const { locality, city, country, pin } = req.body;
  try {
    // if(!locality || !city || !pin){
    //     return
    // }
    const address = await Address.create({
      locality,
      city,
      country,
      pin,
      user: req.user,
    });
    return res.json({
      message: "Address added",
      address: address,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const getAddress = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user });
    if (address.length <= 0) {
      return res.json({
        address: [],
      });
    }
    return res.json({
      address: address,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};
export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({
        error: "Not found",
      });
    }
    return res.json({
      message: "Address removed",
      address: address,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};
export const makeOrder = async (req, res) => {
  const { items, totalAmount, address } = req.body;
  try {
    const newOrder = await Order.create({
      user: req.user,
      address,
      items: items,
      totalAmount,
    });
    //    await Promise.all(items.map((item)=>
    //         Product.find(item.product)
    //         // Product.findByIdAndUpdate(item.Product,
    //         //     {$inc: {stock: -item.quantity}}
    //         // )
    //     ))

    return res.json({
      message: "Order placed",
      order: newOrder,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const getOrders = async (req, res) => {
  try {
    // const orders = await Order.find({})
    const orders = await Order.find({ user: req.user })
      .populate(
        "address user items.product",
        "city locality pin price title images quantity firstName lastName"
      );
    if (orders.length <= 0) {
      return res.json({
        orders: [],
      });
    }
    return res.json({
      orders: orders,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    return res.json({
      message: "Order cancel",
      order: order,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
