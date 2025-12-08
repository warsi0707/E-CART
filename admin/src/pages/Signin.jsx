import { useState } from "react"
import {useDispatch} from "react-redux"
import { signinThunk } from "../redux/features/adminThunks";

export default function Signin() {
      const [isHide, setIsHide] = useState(false) 
      const [userData, setUserData] = useState({
        email: "",
        password: ""
      })
      const dispatch = useDispatch()

      const handleChnage =(e)=>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setUserData((prev)=>({...prev, [name]:value}))
      }
      const handleSubmit =()=>{
        dispatch(signinThunk(userData))
      }
  return (
      <div className="min-h-screen lg:w-[1100px]  mx-auto flex gap-32 flex-col md:flex-row lg:justify-between ">
            <div className="hidden md:flex w-full lg:min-h-screen  justify-start  lg:pt-32 items-start p-5">
                <img src="/sign.svg" className="h-1/2 w-full" alt="" />
            </div>
            <div className="w-full lg:min-h-screen  p-5 flex flex-col gap-3   lg:pt-32">
                <h1 className="text-2xl font-semibold py-5">Admin Login</h1>
               <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-sm">Email</label>
                  <input value={userData.email} onChange={handleChnage} name="email" placeholder="Type here" className="border border-gray-400 outline-none p-2 text-sm rounded-md"/>
              </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-sm">Password</label>
                    <div className="border border-gray-400 w-full flex justify-between px-2 rounded-md">
                        <input  type={isHide? "text": "password"} name="password" value={userData.password} onChange={handleChnage} placeholder="Type here" className=" p-2 w-full outline-none text-sm " />
                        {isHide? 
                        <button onClick={()=> setIsHide(!isHide)} className="cursor-pointer"><i className="fa-regular fa-eye-slash"></i></button>:
                        <button onClick={()=> setIsHide(!isHide)} className="cursor-pointer"><i className="fa-regular fa-eye"></i></button>
                        }
                    </div>
                </div>
                
                 <button onClick={handleSubmit} className="bg-purple-primary text-white p-2 text-sm rounded-md cursor-pointer">Signin</button>
            </div>
        </div>
  )
}
