import { Link, useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import SignButton from "../components/SignButton";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { userSigninThunk } from "../redux/thunks/userSignThunk";
import { signinSchema } from "../utils/Schema";
import {z} from "zod"


export default function Signin(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state => state.user.logLoading)

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({})


    const handleChange =async(e)=>{
        const {name, value} = e.target;
        setLoginData((prev)=> ({...prev, [name]: value}))
        setError({})

    }
    const handleSignin =async(formData)=>{
        const {success, error} = signinSchema.safeParse(formData)
        if(!success){
            setError(z.flattenError(error).fieldErrors)
            return;
        }
        await dispatch(userSigninThunk({email:formData.email, password:formData.password})).unwrap()
        navigate("/")
    }

    return (
         <div className="min-h-screen lg:w-[1100px]  mx-auto flex gap-32 flex-col md:flex-row lg:justify-between ">
            <div className="hidden md:flex w-full lg:min-h-screen  justify-start  lg:pt-32 items-start p-5">
                <img src="/sign.svg" className="h-1/2 w-full" alt="" />
            </div>
            <div className="w-full lg:min-h-screen  p-5 flex flex-col gap-3   lg:pt-32">
                <h1 className="text-2xl font-semibold py-5">Login</h1>
                <FormInput value={loginData.email} handleChange={handleChange} name={'email'} error={error.email} lable={"Email"} type={'email'}/>
                <PasswordInput value={loginData.password} handleChange={handleChange} error={error.password} label={"Password"} name={'password'} lable={"Password"} />
                {/* <PasswordInput value={loginData.confirmPassword} handleChange={handleChange} error={error.confirmPassword} label={"Confirm password"} name={'confirmPassword'} lable={"Confirm password"} /> */}
                <div className="flex items-center text-sm">
                    <p>Have already an account? </p>
                    <Link to={"/signup"} className="underline text-purple-primary">Register</Link>
                </div>
                <SignButton handleClick={()=>handleSignin(loginData)} title={loading? "Loading...": "Signin"}/>
            </div>
        </div>
    )
}