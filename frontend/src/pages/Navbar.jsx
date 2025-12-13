import { Link } from "react-router";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authVerify, toggleTheme } from "../redux/slices/userSlice";
const AdminNavbar = lazy(()=> import("../admin/AdminNavbar"))
const SearchBar = lazy(()=> import("../components/SearchBar"))
const NavLink = lazy(()=> import("../components/NavLink"))

export default function Navbar() {
  const isDark = useSelector(state => state.user.isDarkTheme)
    const [isMenu, setIsMenu] = useState(false)
    const dispatch = useDispatch()
    const userAuth = useSelector(state => state.user) 

    useEffect(()=>{
      const dark = JSON.parse(localStorage.getItem('isDark'))
      if(dark){
        document.documentElement.classList.add("dark")
      }else{
        document.documentElement.classList.remove("dark")
      }
      dispatch(authVerify())
    },[dispatch])

    if(userAuth?.user?.role === 'Admin'){
      return (
        <AdminNavbar/>
      )
    }else{
  return (
    <>
      <nav className="w-full border-b border-slate-200">
      <div className=" border-primary py-3 px-2 lg:px-0  lg:w-[1100px]  flex  justify-between  mx-auto">
        <Link to={"/"} className="flex items-center gap-1 ">
          <img src="/logo/logo-shape.svg" className="w-8 h-8" alt="" />
          <p className="text-lg sm:text-xl">E-cart</p>
        </Link>
        <div className="hidden md:flex w-96">
            <SearchBar/>
        </div>
        <div className="items-center gap-3 hidden sm:flex ">
          {/* <NavLink title={'Saved'} icon={<FaRegHeart/>}/> */}
          <button onClick={()=>dispatch(toggleTheme())} className="text-2xl cursor-pointer">{isDark? <i className="fa-regular fa-sun"></i>:<i className="fa-regular fa-moon"></i>} </button>
          <NavLink title={'My cart'} links={"/cart-items"} icon={<i className="fa-solid fa-cart-shopping"></i>}/>
          <NavLink title={'User'} links={userAuth?.user?.isAuthenticated == true? "/account" : "/signin"} icon={<i className="fa-solid fa-user"></i>}/>

        </div>
        <div className="flex justify-center items-center sm:hidden">
            {isMenu? <button onClick={()=> setIsMenu(!isMenu)} className="text-xl cursor-pointer"><i className="fa-solid fa-xmark"></i></button>: 
            <button onClick={()=> setIsMenu(!isMenu)} className="text-xl cursor-pointer"><i className="fa-solid fa-bars"></i></button>}
        </div>
      </div>
      <div className="p-1 sm:hidden">
        <SearchBar/>
      </div>
    </nav>
    <div className="w-full border-b border-slate-200">
    </div>
    </>
  );
}}
