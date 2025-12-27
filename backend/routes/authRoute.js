import express from 'express'
import { forgetPassword, updateEmail, updateMobile, updateName, userSignin, userSignUp, userVerify } from "../controllers/AuthController.js"
import AuthChecker from "../middleware/AuthMiddle.js"
const authRouter = express.Router()

authRouter.post("/signup", userSignUp)
.post("/signin", userSignin)
.get('/verify', AuthChecker,userVerify)
.patch("/forget-password", forgetPassword)
.patch("/update-name", AuthChecker, updateName)
.patch("/update-mobile", AuthChecker, updateMobile)
.patch("/update-email", AuthChecker, updateEmail)

export default authRouter;