import express from "express"
import {getProducts, getProductById, filterProcuct} from "../controllers/ProductController.js"
const productRouter = express.Router()

productRouter.get("/", getProducts)
.get("/filter", filterProcuct)
.get("/:id", getProductById)

export default productRouter