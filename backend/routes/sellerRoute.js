import express from "express";
import {
  deleteProduct,
  editProduct,
  filterProduct,
  getProductById,
  getProducts,
  getSellerOrders,
  postProduct,
  sellerCancelOrder,
  updateOrderStatus,
  updateStatus,
} from "../controllers/SellerControllers.js";
import AuthChecker from "../middleware/AuthMiddle.js";
import upload from "../utils/ImageUploader.js";
const sellerRouter = express.Router();

sellerRouter
  .post("/product", AuthChecker, upload.array("images", 10), postProduct)
  .get("/product/filter", AuthChecker, filterProduct)
  .get("/products", AuthChecker, getProducts)
  .get("/orders", AuthChecker, getSellerOrders)
  .get("/product/:id", AuthChecker, getProductById)
  .put("/product/:id", AuthChecker, editProduct)
  .delete("/product/:id", AuthChecker, deleteProduct)
  .patch("/product/status/:id", AuthChecker, updateStatus)
  .patch("/order/status/:id", AuthChecker, updateOrderStatus)
  .delete("/order/:id", AuthChecker, sellerCancelOrder);

export default sellerRouter;
