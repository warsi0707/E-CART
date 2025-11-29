import { lazy, memo, useState } from "react"
import {Link} from "react-router"
const UpdateStatus = lazy(()=> import("../../pages/UpdateStatus"))
const StatusCard = lazy(()=> import("./StatusCard"))

function SellerProcutCard({product, onDelete}){
    const [isUpdating, setIsUpdating] = useState(false)
    return (
        <>
        <div className="w-full p-2 border border-gray-300 shadow-md rounded-md flex items-center justify-between">
           <img src="/1.png" className="h-16 rounded-md" alt="" />
           <div>
                <Link to={"#"} className="text-purple-primary hover:underline font-semibold">{product?.title}</Link>
                <p className="text-sm">{product?.category}</p>
           </div>
           <StatusCard status={product.status}/>
           <p>{product.stock}</p>
           <div className="flex items-center">
                <i className="fa-solid fa-indian-rupee-sign"></i>
                <p>1200</p>
           </div>
           <div className="flex items-center gap-2">
            <Link to={""} title="Details" className=" text-md">
                <p className="border p-2 rounded-md border-gray-400"><i className="fa-solid fa-up-right-from-square"></i></p>
            </Link>
             <button onClick={()=> setIsUpdating(true)} title="Edit" className=" text-md cursor-pointer">
                <p className="border p-2 rounded-md border-gray-400"><i className="fa-solid fa-pen"></i></p>
            </button>
           
             <button onClick={onDelete} title="Delete" className="border p-2 rounded-md border-red-primary text-red-primary cursor-pointer"><i className="fa-solid fa-trash"></i></button>
           </div>
        </div>
         {isUpdating && <UpdateStatus setIsUpdating={setIsUpdating} title={product.title} status={product.status} id={product._id}/>}
        </>
    )
}
export default memo(SellerProcutCard)