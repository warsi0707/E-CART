import  express from 'express'
import AuthChecker from '../middleware/AuthMiddle.js';
import { cancelOrder, deleteAddress, getAddress, getOrders, makeOrder, postAddress } from '../controllers/UserController.js';
const userRouter = express.Router()

userRouter.post("/address", AuthChecker, postAddress)
.get("/address", AuthChecker, getAddress)
.get("/orders", AuthChecker, getOrders)
.post("/order", AuthChecker, makeOrder)
.delete("/address/:id", AuthChecker, deleteAddress)
.delete("/order/:id", AuthChecker, cancelOrder)

export default userRouter;