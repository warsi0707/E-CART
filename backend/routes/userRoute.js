import  express from 'express'
import AuthChecker from '../middleware/AuthMiddle.js';
import { deleteAddress, getAddress, makeOrder, postAddress } from '../controllers/UserController.js';
const userRouter = express.Router()

userRouter.post("/address", AuthChecker, postAddress)
.get("/address", AuthChecker, getAddress)
.post("/order", AuthChecker, makeOrder)
.delete("/address/:id", AuthChecker, deleteAddress)

export default userRouter;