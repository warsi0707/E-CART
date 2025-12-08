import { useCallback, useState } from "react";
import {useDispatch} from "react-redux"
import { logOut } from "../redux/features/adminSlice";
import { lazy } from "react";
const NavButton = lazy(()=> import("../components/NavButton"))
const DashboardHome = lazy(()=> import("./DashboardHome"))
const AllOrders = lazy(()=> import("./AllOrders"))
const Products = lazy(()=> import("./Products"))
const Sellers = lazy(()=> import("./Sellers"))
const Customers = lazy(()=> import("./Customers"))

export default function Dashboard() {
  const dispatch = useDispatch()
  const navItems = [
    {
      title: "Dashboard",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      title: "All orders",
      icon: <i className="fa-solid fa-truck"></i>,
    },
    {
      title: "Products",
      icon: <i className="fa-solid fa-box"></i>,
    },
    {
      title: "Sellers",
      icon: <i className="fa-solid fa-user-group"></i>,
    },
    {
      title: "Customers",
      icon: <i className="fa-solid fa-users"></i>,
    },
    {
      title: "Invoices",
      icon: <i className="fa-solid fa-file"></i>,
    },
    {
      title: "Settings",
      icon: <i className="fa-solid fa-gear"></i>,
    },
  ];
  const [activeNav, setActiveNav] = useState(navItems[0].title);

  const handleSet = useCallback((item) => {
    setActiveNav(item);
  }, []);

  return (
    <div className=" w-full min-h-screen grid grid-cols-10">
      <div className="bg-slate-primary h-full col-span-2 space-y-  p-2">
        <div className="flex gap-1 items-center border-b py-2 border-slate-300">
          <img src="/logo-shape.svg" alt="" />
          <p className="text-xl hidden md:flex">ADMIN</p>
        </div>
        <div className="py-5 space-y-2 border-b border-gray-400">
          {navItems.map((item, indx) => (
            <NavButton
              key={indx}
              title={item.title}
              icon={item.icon}
              activeNav={activeNav}
              onSet={() => handleSet(item.title)}
            />
          ))}
        </div>
        <div className="pt-5">
          <button onClick={()=> dispatch(logOut())} className="flex items-center gap-2  cursor-pointer hover:bg-purple-secondry hover:text-purple-primary   w-full p-2 rounded-md">
           <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <p>Logout</p>
          </button>
        </div>
      </div>
      <div className=" h-full col-span-8 min-h-screen">
        <div className="bg-gray-primary w-full border-b border-slate-primary flex justify-between items-center p-2.5">
          <p className="text-lg font-semibold">{activeNav}</p>
          <div className="flex items-center gap-2">
            <div className="space-x-2 hidden md:flex">
              <input
                type="text"
                className="border p-2 rounded-md bg-slate-secondry"
                placeholder="Search here"
              />
              <button className="bg-slate-primary border border-gray-400 p-2.5 cursor-pointer rounded-md">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <button className="flex bg-slate-primary border border-gray-300  p-2.5 rounded-md cursor-pointer">
              <p><i className="fa-solid fa-user"></i></p>
              <p>My account</p>
            </button>
          </div>
        </div>
        {activeNav === "Dashboard" && <DashboardHome/> }
        {activeNav === "All orders" && <AllOrders/> }
        {activeNav === "Products" && <Products/> }
        {activeNav === "Sellers" && <Sellers/> }
        {activeNav === "Customers" && <Customers/> }
      </div>
    </div>
  );
}
