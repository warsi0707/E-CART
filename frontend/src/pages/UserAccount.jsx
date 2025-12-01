import { lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/slices/userSlice";
const SellerProduct = lazy(()=> import("./SellerProduct"))
const UserAddress = lazy(()=> import("./UserAddressPage"))
const MyOrderPage = lazy(()=> import("./MyOrderPage"))


function UserAccount() {
  const dispatch = useDispatch()
  const userAuth = useSelector(state => state.user)
  const userMenu =[
    {
      icon: <i className="fa-solid fa-car-side"></i>,
      title: "My orders",
    },
    {
      icon: <i className="fa-solid fa-location-dot"></i>,
      title: "My Addresses",
    },
    {
      icon: <i className="fa-solid fa-lock"></i>,
      title: "Login & Security",
    },
  ]
  const [activeMenu, setActivemenu] = useState("My orders")
  useEffect(()=>{
    setActivemenu("My orders")
  },[])

  return (
    <div className="min-h-screen px-3 lg:w-[1100px] mx-auto">
      <div className="py-5">
        <p className="text-2xl font-semibold">{userAuth?.user?.firstName.toUpperCase()} {userAuth?.user?.lastName.toUpperCase()}</p>
        <p className="text-sm">{userAuth?.user?.email}</p>
      </div>
      <div className="w-full gap-3 md:mx-auto flex justify-center  md:grid md:grid-cols-10 ">
        <div className="min-h-screen w-10 md:w-full lg:col-span-3 flex items-start flex-col gap-10">
            <div className="w-full flex flex-col gap-2">
                {userMenu.map((menu, indx) => (
                    <button key={indx} onClick={()=> setActivemenu(menu.title)} className={`${menu.title ===activeMenu? "bg-purple-secondry border": "bg-white"} hover:bg-gray-primary flex gap-2 items-center justify-center md:justify-start w-full p-1 lg:p-2 cursor-pointer rounded-sm  text-xl border-gray-300  text-purple-primary`}>
                    <p className="text-purple-primary bg-white p-1 rounded-md">{menu.icon}</p>
                    <p className="text-sm hidden lg:flex">{menu.title}</p>
                    </button>
                ))}
                {userAuth?.user?.role === "SELLER" &&
                <button  onClick={()=> setActivemenu("Seller")} className={`${activeMenu ==="Seller"?"bg-purple-secondry border": "bg-white"} hover:bg-gray-primary flex gap-2 items-center justify-center md:justify-start w-full p-1 lg:p-2 cursor-pointer rounded-sm  text-xl border-gray-300  text-purple-primary`}>
                  <p className="text-purple-primary bg-white p-1 rounded-md"><i className="fa-solid fa-user"></i></p>
                  <p className="text-sm hidden lg:flex">Seller</p>
                </button>}
          </div>
          <div className="py-5 border-t border-gray-primary w-full">
            <button onClick={()=>dispatch(userLogout())} className={` flex gap-2 items-center w-full p-1 lg:p-2 cursor-pointer rounded-sm hover:bg-red-300 hover:text-white text-xl border-gray-300  text-purple-primary`}>
              <p className="text-purple-primary bg-white p-1 rounded-md"><i className="fa-solid fa-arrow-right-from-bracket"></i></p>
              <p className="text-sm hidden lg:flex">Logout</p>
            </button>
          </div>
        </div>
        <div className="min-h-screen w-full md:col-span-7 ">
            {activeMenu === "My orders" && <MyOrderPage/>}
            {activeMenu === "My Addresses" && <UserAddress/>}
            {activeMenu === "Seller" && <SellerProduct/>}
        </div>
      </div>
    </div>
  );
}
export default memo(UserAccount);
