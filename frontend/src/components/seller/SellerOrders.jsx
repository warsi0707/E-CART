import { useDispatch, useSelector } from "react-redux";
import SellerOrderCard from "./SellerOrderCard";
import { useCallback, useEffect } from "react";
import { sellerCancelOrdersThunk, sellerOrdersThunk } from "../../redux/thunks/sellerThunk";

export default function SellerOrders(){
    const {orders, ordersLoading} = useSelector(state => state.seller.orders)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(sellerOrdersThunk())
    },[])

    const handleCancel =useCallback((id)=>{
        if(!id) return
        dispatch(sellerCancelOrdersThunk(id))
    },[])
    return(
        <div className="border  w-full min-h-screen rounded-md border-gray-primary space-y-5 p-2">
            <div className="flex justify-end gap-2">
               <input type="text" className="border border-purple-primary rounded-md p-1" placeholder="Order id" />
                <button  className="bg-purple-primary text-white p-2 rounded-md cursor-pointer flex items-center gap-1">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
                <div className="flex flex-col gap-2">
                    {orders.length <=0 && <p className="text-2xl text-center pt-10">No Orders </p>}
                    {orders && orders.map((order)=>(
                        <SellerOrderCard key={order._id} order={order} handleCancel={()=> handleCancel(order._id)}/>
                    ))}
                </div>
        </div>
    )
}