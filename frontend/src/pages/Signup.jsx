import { useState } from "react";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import SignButton from "../components/SignButton";
import {Link, useNavigate} from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod"
import { signupSchema } from "../utils/Schema";
import { userSignUpThunk } from "../redux/thunks/userSignThunk";

export default function Signup(){
    const dispatch = useDispatch()
    const loading = useSelector(state => state.user.user.loading)
    const navigate = useNavigate()

    const [userData, setUserdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        mobile: ''
    })
    const [error, setError] = useState({})

    const handleChange =(e)=>{
        const {name, value} = e.target
        setUserdata((prev)=> ({...prev, [name]: value}))
        setError({})
    }
    const handleSignup =async(e)=>{
        e.preventDefault()
        const {success, error} =signupSchema.safeParse(userData) 
      
        if(!success){
            setError(z.flattenError(error).fieldErrors)
            return;
        }
        await dispatch(userSignUpThunk({email:userData.email, password:userData.password, firstName:userData.firstName, lastName: userData.lastName, role:userData.role, mobile:userData.mobile})).unwrap()
        setUserdata({})
        navigate("/signin")
    }
    return(
        <div className="min-h-screen w-full lg:w-[1100px]  mx-auto flex">
            <div className="hidden lg:flex w-full min-h-screen  justify-start  pt-32 items-start p-5">
                <img src="/sign.svg" className="h-1/2 w-full" alt="" />
            </div>
            <div className="w-full min-h-screen  p-5 flex flex-col gap-3   pt-10">
                <h1 className="text-2xl font-semibold py-5">Register as a new user</h1>
                <div className="w-full flex gap-5">
                    <FormInput value={userData.firstName} handleChange={handleChange} name={'firstName'} error={error.firstName} lable={"First name"} type={'text'}/>
                    <FormInput value={userData.lastName} handleChange={handleChange} name={'lastName'} error={error.lastName} lable={"Last name"} type={'text'}/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="" className="text-sm">Account Type</label>
                    <select name="role" value={userData.role} onChange={handleChange} className="p-2 rounded-md border border-gray-400 outline-none text-sm">
                        <option  >Choose account type</option>
                        <option value="USER">USER</option>
                        <option value="SELLER">SELLER</option>
                    </select>
                    {/* <p className="text-xs text-red-500">erro</p> */}
                </div>
                <FormInput lable={"Email"} type={'email'} value={userData.email} handleChange={handleChange} name={'email'} error={error.email}/>
                <FormInput lable={"Contact number"} type={'text'} value={userData.mobile} handleChange={handleChange} name={'mobile'} error={error.mobile}/>
                <PasswordInput label={"Password"} value={userData.password} handleChange={handleChange} name={'password'} error={error.password}/>
                
                <div className="flex items-center text-sm">
                    <p>Have already an account? </p>
                    <Link to={"/signin"} className="underline text-purple-primary">Signin</Link>
                </div>
                <SignButton handleClick={handleSignup} title={`${loading ==true? "Loading...": "Register"}`}/>
            </div>
        </div>
    )
}