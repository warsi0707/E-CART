import { useDispatch, useSelector } from "react-redux";
import MyOrderCard from "../components/MyOrderCard";
import { useEffect } from "react";
import { cancelOrderThunk, getOrdersThunk } from "../redux/thunks/userSignThunk";
import MyOrderSkeleton from "../components/skeleton/MyOrderSkeleton";

export default function MyOrderPage(){
    const dispatch = useDispatch()
    const orders = useSelector(state=> state.user.orders)
    const loading = useSelector(state => state.user.orderLoading)

    useEffect(()=>{
        dispatch(getOrdersThunk())
    },[])

    const handleCancelOrder =(id)=>{
        dispatch(cancelOrderThunk(id))
    }
    if(orders?.length <=0){
        return (
            <div className="flex justify-center items-center">
                <p className="text-2xl">No orders</p>
            </div>
        )
    }
    if(loading){
        return (
            <MyOrderSkeleton/>
        )
    }
    return (
        <div className="w-full min-h-screen flex flex-col pb-5 gap-5 px-2">
            {orders && orders.map((order)=>(
                <MyOrderCard key={order._id} order={order} onCancel={()=> handleCancelOrder(order._id)}/>
            ))}
        </div>
    )
}