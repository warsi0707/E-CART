import  jwt from 'jsonwebtoken'
import { USER_JWT_SECRET } from '../config/Config.js'

const AuthChecker =async(req, res, next)=>{
    const {token} = req.headers
    try{
        if(!token){
            return res.json({
                error: "Login required"
            })
        }
        const decoded = jwt.verify(token, USER_JWT_SECRET)
        if(!decoded){
            return res.json({
                error: "Login required"
            })
        }
        req.user = decoded.user
        next()
    }catch(error){
        return res.json({
            error: error
        })
    }
}
export default AuthChecker;