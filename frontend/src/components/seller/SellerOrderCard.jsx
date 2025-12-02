import { lazy, memo, useState } from "react";
import { BackendUrl } from "../../utils/Backendurl";
const UpdateStatusPage = lazy(()=> import("./UpdateStatusPage"))

function SellerOrderCard({order, handleCancel}){
    const [isUpdating, setIsUpdating] = useState(false)
    const dates =new Date(order?.createdAt)
    const date = dates.toLocaleDateString('en-IN',{day: 'numeric', month: 'short', year: "numeric"})
    const time = dates.toLocaleTimeString('en-IN',{hour: 'numeric', minute: 'numeric'})

    return (
        <>
         <div className="printable w-full border border-gray-primary rounded-md p-2 md:px-5">
                    <div className="flex justify-between items-center border-b border-gray-primary py-3">
                        <div>
                            <div className="md:text-xl font-semibold flex items-center gap-2">
                                <p className="text-lg">Order:</p> 
                                <p className="text-lg">#{order?._id}</p>
                            </div>
                            <p className="text-xs md:text-sm text-slate-primary">{order?.items.length} Products | By {order?.user.firstName}{order?.user.lastName} | {date}, {time}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={()=> setIsUpdating(true)} title="Download invoice" className="flex items-center gap-1 border p-1 rounded-md cursor-pointer border-gray-primary shadow- hover:shadow-2xl">
                              <i className="fa-solid fa-pen"></i>
                                <p className="hidden md:flex">Update status</p>
                            </button>
                            <button onClick={handleCancel} title="Download invoice" className="flex items-center gap-1 border p-1 rounded-md cursor-pointer border-gray-primary shadow- hover:shadow-2xl">
                               <i className="fa-solid fa-xmark"></i>
                                <p className="hidden md:flex">Cancel</p>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-10 py-3">
                        <div className="flex flex-col items-start ">
                            <p>Status</p>
                            <p>Delivery to: </p>
                            
                        </div>
                        <div className="flex flex-col items-start ">
                            <p>{order.status}</p>
                            <p>{order.address.city}, {order.address.locality}, {order.address.pin}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-primary py-3 w-full grid sm:grid-cols-2 gap-3 ">
                        {order && order?.items.map((item)=>(
                            <div key={item._id} className="flex items-center gap-5">
                                <img src={`${BackendUrl}/${item?.product?.images[0]}`} className="h-20 w-20 rounded-md" alt="" />
                                <div>
                                    <p className="">{item?.product.title}</p>
                                    <p className="text-sm">Quantity: {item.quantity}</p>
                                    <p className="text-sm">Price: {item.price}</p>
                                </div>
                        </div>
                        ))}
                    </div>
        </div>
        {isUpdating && <UpdateStatusPage setIsUpdating={setIsUpdating} status={order.status} id={order._id}/>}
        </>
    )
}
export default memo(SellerOrderCard)