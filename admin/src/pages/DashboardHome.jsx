import { useDispatch, useSelector } from "react-redux";
import BarChartPage from "../charts/BarChartPage";
import PieChartPage from "../charts/PieChartPage";
import { useEffect } from "react";
import { getAllStatsThunk } from "../redux/features/adminThunks";

export default function DashboardHome(){
    const dispatch = useDispatch()
      const {stats, loading} = useSelector(state=> state.admin.allStats)
    
      useEffect(()=>{
        dispatch(getAllStatsThunk())
      },[])
    return (
        <div className=" min-h-screen w-full p-5 space-y-5">
            {loading ==true ?
            <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-20">
                <div className="bg-purple-secondry w-full  h-32 rounded-md flex justify-between items-center"></div>
                <div className="bg-purple-secondry w-full p-5 rounded-md flex justify-between items-center"></div>
                <div className="bg-purple-secondry w-full p-5 rounded-md flex justify-between items-center"></div>
                <div className="bg-purple-secondry w-full p-5 rounded-md flex justify-between items-center"></div>
            </div>:
            
            <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-20">
                <div className="bg-purple-secondry w-full p-5 rounded-md flex justify-between items-center">
                    <div className="text-xl space-y-5">
                        <p className="text-2xl">Total Products</p>
                        <p>{stats?.products}</p>
                    </div>
                    <i className="fa-solid fa-bag-shopping text-4xl"></i>
                </div>
                <div className="bg-purple-secondry w-full p-5 rounded-md flex justify-between items-center">
                    <div className="text-2xl space-y-5">
                        <p>Total orders</p>
                        <p>{stats?.orders}</p>
                    </div>
                    <i className="fa-solid fa-truck text-4xl"></i>
                </div>
                <div className="bg-purple-secondry w-full p-5 rounded-md flex justify-between items-center">
                    <div className="text-2xl space-y-5">
                        <p>Customers</p>
                        <p>{stats?.users}</p>
                    </div>
                    <i className="fa-solid fa-user text-4xl"></i>
                </div>
                 <div className="bg-purple-secondry w-full p-5 rounded-md flex justify-between items-center">
                    <div className="text-2xl space-y-5">
                        <p>Sellers</p>
                        <p>{stats?.sellers}</p>
                    </div>
                    <i className="fa-solid fa-user text-4xl"></i>
                </div>
            </div>}
            <div className="w-full h-[600px] flex flex-col md:flex-row gap-1">
                <div className="w-full h-full border rounded-md border-gray-300">
                    <PieChartPage/>
                </div>
                <div className="w-full h-full flex justify-center items-center border rounded-md border-gray-300 p-2 ">
                    <BarChartPage/>
                </div>
            </div>
        </div>
    )
}