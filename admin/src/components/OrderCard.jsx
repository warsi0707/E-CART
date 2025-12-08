import { memo } from "react"
import {Link} from "react-router"

function OrderCard({order}){
    return (
        <div className="w-full  border-b border-slate-300 flex items-center p-3 justify-between">
            <Link className="text-purple-primary flex items-center gap-1">
                <i className="fa-solid fa-truck"></i>
                <p className="hover:underline">#43523</p>
            </Link>
            <p>July 12, 2025</p>
            <p>{order?.user?.firstName} {order?.user?.lastName}</p>
            <div className="bg-green-secondry flex justify-center items-center w-36 p-1 rounded-full">
                <i className="fa-solid fa-check"></i>
                <p>{order?.status}</p>
            </div>
            <div className="flex items-center">
                <i className="fa-solid fa-indian-rupee-sign"></i>
                <p>{order?.totalAmount}</p>
            </div>
            <Link to={""} className="border border-slate-primary text-center p-2 rounded-md border-b-black">View Detail</Link>
        </div>
    )
}

export default memo(OrderCard)