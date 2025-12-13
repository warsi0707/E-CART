import express from 'express'
import { forgetPassword, updateMobile, updateName, userSignin, userSignUp, userVerify } from "../controllers/AuthController.js"
import AuthChecker from "../middleware/AuthMiddle.js"
const authRouter = express.Router()

authRouter.post("/signup", userSignUp)
.post("/signin", userSignin)
.get('/verify', AuthChecker,userVerify)
.patch("/forget-password", AuthChecker, forgetPassword)
.patch("/update-name/:id", AuthChecker, updateName)
.patch("/update-mobile/:id", AuthChecker, updateMobile)


export default authRouter;