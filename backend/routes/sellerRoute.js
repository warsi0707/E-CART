import  express from 'express'
import { deleteProduct, editProduct, filterProduct, getProductById, getProducts, postProduct, updateStatus } from '../controllers/SellerControllers.js';
import AuthChecker from "../middleware/AuthMiddle.js"
import upload from '../utils/ImageUploadermulter.js';
const sellerRouter = express.Router()


sellerRouter.post("/product",AuthChecker, upload.array("images"), postProduct)
.get("/product/filter",AuthChecker, filterProduct)
.get("/products", AuthChecker, getProducts)
.get("/product/:id", AuthChecker, getProductById)
.put("/product/:id",AuthChecker, editProduct)
.delete("/product/:id",AuthChecker, deleteProduct)
.patch("/product/status/:id",AuthChecker, updateStatus)


export default sellerRouter;