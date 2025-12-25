import bcrypt from"bcrypt"
import  jwt from 'jsonwebtoken'
import { USER_JWT_SECRET } from "../config/Config.js";
import User from "../models/UserModel.js"
import { z } from 'zod'
import { updatePasswordSchema } from "../utils/Schema.js";



export const userSignUp = async (req, res) => {
  const {  email, password, firstName, lastName, role, mobile} =
    req.body;
  try {
    // const {success, error} = signupSchema.safeParse({email, password, firstName, lastName})
    // console.log(z.flattenError(error))
    // if(!success){
    //   return res.status(404).json({
    //     error: z.flattenError(error).fieldErrors
    //   })
    // }
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.status(501).json({
        error: "User already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      role: role,
      mobile
    });
    return res.json({
      message: "Signup successfully",
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const userSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    console.log(user)
    if (!user) {
      return res.status(501).json({
        error: "User Not Found",
      });
    }

    const comparePassword = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!comparePassword) {
      return res.status(404).json({
        message: "Signin failed",
      });
    }
    const token = jwt.sign({
        user: user._id
    },USER_JWT_SECRET)
    return res.json({
        token: token,
        message: 'Signin success',
        user: {
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          contact: user.mobile
        }
    })
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const userVerify =async(req, res)=>{
  try{
    const user = await User.findById(req.user).select('username email role')
    return res.json(user)
  }catch(error){
    return res.status(404).json({
      error: error
    })
  }
}
export const forgetPassword =async(req,res)=>{
  const {email, password, confirmPassword} = req.body;
  try{
    const {error, success} = updatePasswordSchema.safeParse(req.body)
    if(!success){
      const fieldErrors = z.flattenError(error).fieldErrors
      return res.status(401).json({
        error: fieldErrors
      })
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({
        error: "Email not found, please signup"
      })
    }
    if(password !== confirmPassword){
      return res.status(501).json({
        error: "Password not matched"
      })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate(user._id,{
      password: hashPassword
    })
    return res.json({
      message: 'Password updated successfully',
    })
  }catch(error){
    return res.status(404).json({
      error: error
    })
  }
}
export const updateName =async(req, res)=>{
  const {firstName, lastName} = req.body;
  try{
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName, 
      lastName
    },{new: true})
    return res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  }catch(error){
    return res.status(404).json({
      error: error
    })
  }
}
export const updateMobile =async(req, res)=>{
  const {mobile} = req.body;
  try{
    const user = await User.findByIdAndUpdate(req.params.id, {
      mobile
    },{new: true})
    return res.json({
      mobile: {
        mobile: user.mobile
      }
    })
  }catch(error){
    return res.status(404).json({
      error: error
    })
  }
}