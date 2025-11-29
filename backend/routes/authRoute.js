import express from 'express'
import { userSignin, userSignUp, userVerify } from "../controllers/AuthController.js"
import AuthChecker from "../middleware/AuthMiddle.js"
const authRouter = express.Router()

authRouter.post("/signup", userSignUp)
.post("/signin", userSignin)
.get('/verify', AuthChecker,userVerify)


export default authRouter;