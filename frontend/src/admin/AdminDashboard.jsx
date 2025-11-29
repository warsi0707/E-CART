import { IoHomeOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBox } from "react-icons/fa6";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/slices/userSlice";
import { lazy } from "react";
const AdminProduct = lazy(()=> import("./AdminProduct"))

export default function AdminDashboard(){
    const dispatch = useDispatch()
    const navItems = [
        {
            title: "Dashboard",
            icon: <IoHomeOutline/>
        },
        {
            title: "Products",
            icon: <FaBox/>
        },
        {
            title: "All orders",
            icon: <CiDeliveryTruck/>
        }
    ]
    const [active, setActive] = useState("Dashboard")

    const handleSignUp =()=>{
        dispatch(userLogout())
    }

    return (
        <div className="w-full min-h-screen  grid grid-cols-12">
            <div className="col-span-2 flex flex-col gap-2 min-h-screen w-full bg-gray-primary md:p-3">
                {navItems.map((item, indx)=>(
                    <button title={item.title} key={indx} onClick={()=> setActive(item.title)} className={`${item.title === active && "bg-purple-primary text-white"}   flex justify-center items-center lg:justify-start p-2 rounded-md cursor-pointer gap-2 text-purple-primary text-xl  lg:w-full`}>
                    <p>{item.icon}</p>
                    <p className="hidden lg:flex">{item.title}</p>
                </button>
                ))}
                <button onClick={handleSignUp} title="Logout" className={`hover:bg-red-500 hover:text-white  flex justify-center items-center lg:justify-start p-2 rounded-md cursor-pointer gap-2 text-purple-primary text-xl  lg:w-full transition-all duration-300`}>
                    <p><IoIosLogOut/></p>
                    <p className="hidden lg:flex">Logout</p>
                </button>
            </div>
            <div className="w-full min-h-screen col-span-10 ">
                {active === "Products" && <AdminProduct/>}
            </div>
        </div>
    )
}