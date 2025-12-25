import {  useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import SignButton from "../components/SignButton";
import { useState } from "react";
import { updatePasswordSchema } from "../utils/Schema";
import z from "zod";
import {useDispatch, useSelector} from "react-redux"
import { updatePasswordThunk } from "../redux/thunks/userSignThunk";

export default function ForgotPassword(){
    const dispatch = useDispatch()
    const {loading} = useSelector(state=> state.user.user)
    const navigate = useNavigate()
    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({})
    
    const handleChange =(e)=>{
        const {name, value} = e.target
        setUserForm(prev=> ({...prev, [name]: value}))
        setError({})
    }
    const handleUpdate =async()=>{
        if(!userForm) return
        const {error, success} = updatePasswordSchema.safeParse(userForm)
        if(!success){
            const fieldErrors = z.flattenError(error).fieldErrors
            setError(fieldErrors)
            return
        }
        const errors =await dispatch(updatePasswordThunk(userForm))
        if(errors.error){
            return
        }else{
            navigate("/signin")
        }
        
    }
    return (
        <div>
            <div className="min-h-screen lg:w-[1100px]  mx-auto flex gap-32 flex-col md:flex-row lg:justify-between ">
            <div className="hidden md:flex w-full lg:min-h-screen  justify-start  lg:pt-32 items-start p-5">
                <img src="/sign.svg" className="h-1/2 w-full" alt="" />
            </div>
            <div className="w-full lg:min-h-screen  p-5 flex flex-col gap-3   lg:pt-32">
                <h1 className="text-2xl font-semibold py-5">Forgot your password</h1>
                <FormInput value={userForm.email} handleChange={handleChange} name={'email'} error={error.email} lable={"Email"} type={'email'}/>
                <PasswordInput value={userForm.password} handleChange={handleChange} error={error.password} label={"Password"} name={'password'} lable={"Password"} />
                <PasswordInput value={userForm.confirmPassword} handleChange={handleChange} error={error.confirmPassword} label={"Confirm password"} name={'confirmPassword'} lable={"Confirm password"} />
                <SignButton handleClick={handleUpdate} title={loading? "Loading...":"Update password"}/>
            </div>
        </div>
        </div>
    )
}