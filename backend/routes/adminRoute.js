import express from "express"
import { allOrders, allSellers, allStats, allUsers, products, singin } from "../controllers/AdminControllers.js";
import AuthChecker from "../middleware/AuthMiddle.js"
const adminRouter = express.Router()

adminRouter.post("/signin", singin)
.get("/orders", AuthChecker, allOrders)
.get("/users", AuthChecker, allUsers)
.get("/sellers", AuthChecker, allSellers)
.get("/products", AuthChecker, products)
.get("/all-stats", AuthChecker, allStats)



export default adminRouter;