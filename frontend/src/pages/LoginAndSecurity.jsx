import { useState } from "react"
import EditButton from "../components/account/EditButton"
import UpdateInputbtn from "../components/account/UpdateInputbtn"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { updateEmailThunk, updateMobileThunk, updateUsernameThunk } from "../redux/thunks/userSignThunk"
import { conteactUpdateSchema, emailUpdateSchema, signinSchema } from "../utils/Schema"
import z from "zod"

export default function LoginAndSecurity(){
    const dispatch = useDispatch()
    const user = useSelector(state=> state.user.user.items)
    const [isEmailUpdate, setIsEmailUpdate] = useState(false)
    const [fullNameUpdate, setFullNameUpdate] = useState(false)
    const [passwordUpdate, setPasswordUpdate] = useState(false)
    const [mobileUpdate, setMobileUpdate] = useState(false)

    const [userName, setUserName] = useState({
        firstName: user.firstName,
        lastName: user.lastName
    })
    const [email, setEmail] = useState(user.email )
    const [contact, setContact] = useState(user.contact)
    const [error, setError] = useState({})

    const handleUserChange =(e)=>{
        const {name, value} = e.target;
        setUserName(prev=> ({...prev, [name]: value}))
    }
    const handleNameUpdate =()=>{
        if(!userName.firstName && !userName.lastName){
            toast.error("All input required")
        }
        dispatch(updateUsernameThunk(userName))
        setFullNameUpdate(false)
    }
    const handleEmailChnage =()=>{
        const {success, error} = emailUpdateSchema.safeParse({email}) 
        if(!success){
            setError(z.flattenError(error).fieldErrors)
            return;
        }
        dispatch(updateEmailThunk(email))
         setIsEmailUpdate(false)
    }
    const handleContactChnage =()=>{
        const {success, error} = conteactUpdateSchema.safeParse({contact}) 
        if(!success){
            setError(z.flattenError(error).fieldErrors)
            return;
        }
        dispatch(updateMobileThunk(contact))
         setMobileUpdate(false)
    }
    return (
        <div className="min-h-screen w-full py-2 space-y-5">
            <div className="border-b pb-2 border-gray-primary">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <p className="text-sm">Manage your profile</p>
            </div>
            <div className="w-full space-y-5">
                <div>
                    <p className="text-lg">Basic Info</p>
                    <p className="text-sm">Tell us your basic info details</p>
                </div>
                 {/* <--- Full name update ---> */}
                <div className="w-full space-y-5">
                    <label htmlFor="">Full Name</label>
                    <div className="w-full flex gap-2">
                        <p className="border w-1/2 p-2 rounded-md border-gray-primary">{user?.firstName} {user?.lastName}</p>
                       <EditButton handleClick={()=> setFullNameUpdate(!fullNameUpdate)}/>
                    </div>
                    {fullNameUpdate &&
                        <div className="w-full bg-gray-primary rounded-md p-2">
                        <div className="flex flex-col gap-2 w-full md:flex-row md:justify-between md:items-end">
                            <div className="w-full">
                                <label htmlFor="">First name</label>
                                <input name="firstName" value={userName.firstName} onChange={handleUserChange} type="text" className="border w-full rounded-md p-1" placeholder="First name" />
                            </div>
                             <div className="w-full">
                                <label htmlFor="">Last name</label>
                                <input name="lastName" value={userName.lastName} onChange={handleUserChange} type="text" className="border w-full rounded-md p-1" placeholder="Last Name" />
                            </div>
                            <button onClick={handleNameUpdate} className="bg-skyblue-primary text-white h-10 px-3 rounded-md cursor-pointer">Update</button>
                        </div>
                    </div>
                    }
                </div>
                 {/* <--- Email update ---> */}
                <div className="w-full space-y-5">
                    <label htmlFor="">Email</label>
                    <div className="w-full flex gap-2">
                        <p className="border w-1/2 p-2 rounded-md border-gray-primary">{user?.email}</p>
                        <EditButton handleClick={()=> setIsEmailUpdate(!isEmailUpdate)}/>
                    </div>
                    {isEmailUpdate &&
                    <div className="w-full bg-gray-primary rounded-md p-2">
                        <UpdateInputbtn value={email} handleChnage={(e)=> setEmail(e.target.value)} error={error.email} handlceClick={handleEmailChnage} placeholder={"Enter your email"}/>
                    </div>}
                </div>
                 {/* <--- Mobile update ---> */}
                <div className="w-full space-y-5">
                    <label htmlFor="">Mobile </label>
                    <div className="w-full flex gap-2">
                        <p className="border w-1/2 p-2 rounded-md border-gray-primary">{user?.contact}</p>
                        <EditButton handleClick={()=> setMobileUpdate(!mobileUpdate)}/>
                    </div>
                    {mobileUpdate &&
                    <div className="w-full bg-gray-primary rounded-md p-2">
                        <UpdateInputbtn handlceClick={handleContactChnage} value={contact} error={error.contact} handleChnage={(e)=> setContact(e.target.value)} placeholder={"Enter your mobile numbers"}/>
                    </div>}
                </div>
                 {/* <--- Password update ---> */}
                <div className="w-full space-y-5">
                    <label htmlFor="">Password</label>
                    <div className="w-full flex gap-2">
                        <p className="border w-1/2 p-2 rounded-md border-gray-primary"></p>
                         <EditButton handleClick={()=> setPasswordUpdate(!passwordUpdate)}/>
                    </div>
                    {passwordUpdate &&
                    <div className="w-full bg-gray-primary rounded-md p-2">
                        <div className="flex flex-col gap-2 w-full md:flex-row md:justify-between md:items-end">
                            <div className="w-full">
                                <label htmlFor="">Password</label>
                                <input type="text" className="border w-full rounded-md p-1" />
                            </div>
                             <div className="w-full">
                                <label htmlFor="">Password</label>
                                <input type="text" className="border w-full rounded-md p-1" />
                            </div>
                            <button className="bg-skyblue-primary text-white h-10 px-3 rounded-md cursor-pointer">Update</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
} 