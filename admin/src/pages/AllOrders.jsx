import { useEffect } from "react";
import OrderCard from "../components/OrderCard";
import {useDispatch, useSelector} from "react-redux"
import { ordersThunk } from "../redux/features/adminThunks";


export default function AllOrders() {
  const dispatch = useDispatch()
  const {items, loadin} = useSelector(state=> state.admin.orders)


  useEffect(()=>{
    dispatch(ordersThunk())
  },[])
  return (
    <div className="min-h-screen w-full p-3 space-y-3">
      <div className="space-x-2">
        <input type="text" className="bg-slate-secondry border p-2 rounded-md" placeholder="Search by product"/>
        <select name="" id="" className="p-2.5 border rounded-md bg-slate-secondry">
          <option value="">Status: any</option>
          <option value="">Active</option>
          <option value="">Cancel</option>
        </select>
      </div>
      <div className="bg-slate-primary w-full flex justify-between p-3 rounded-md border-b border-slate-300">
        <p>OrderId</p>
        <p>Date</p>
        <p>Order by</p>
        <p>Status</p>
        <p>Total sum</p>
        <p>Action</p>
      </div>
      <div>
        {items.length <=0 && 
        <p>No orders</p>
        }
        {items && items.map((order)=>(
          <OrderCard key={order._id} order={order}/>
        ))}
      </div>
    </div>
  )
}
