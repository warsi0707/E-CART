import { useDispatch, useSelector } from "react-redux";
// import SellerOrderCard from "./SellerOrderCard";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { getSellerOrderByIdThunk, sellerCancelOrdersThunk, sellerOrdersThunk } from "../../redux/thunks/sellerThunk";
import SellerOrderSkeleton from "../skeleton/SellerOrderSkeleton";
const SellerOrderCard = lazy(()=> import("./SellerOrderCard"))

export default function SellerOrders(){
    const {orders, ordersLoading} = useSelector(state => state.seller.orders)
    const [orderId, setOrderId] = useState("")
    const [orderById, setOrderById] = useState({})
   
    const dispatch = useDispatch()

    const handleSearchOrder =async()=>{
       const order =await dispatch(getSellerOrderByIdThunk(orderId))
       if(order.payload){
        setOrderById(order.payload.order)
       }
    }

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
               <input value={orderId} onChange={(e)=> setOrderId(e.target.value)} type="text" className="border border-purple-primary rounded-md w-1/3 p-1" placeholder="Search your order by id" />
                <button onClick={handleSearchOrder} className="bg-purple-primary text-white p-2 rounded-md cursor-pointer flex items-center gap-1">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
                <div className="flex flex-col gap-2">
                    { orders?.length <=0 && <p className="text-2xl text-center pt-10">No Orders </p>}
                    <Suspense fallback={<SellerOrderSkeleton/>}>
                    {orders && orders.map((order)=>(
                        <SellerOrderCard key={order._id} order={order} handleCancel={()=> handleCancel(order._id)}/>
                    ))}
                    </Suspense>
                    {/* {orderById && <SellerOrderCard order={orderById}/>} */}
                </div>
        </div>
    )
}