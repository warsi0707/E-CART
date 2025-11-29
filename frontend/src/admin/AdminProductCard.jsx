import { Link } from "react-router";
import { RiFileEditFill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { memo } from "react";

 function AdminProductCard({product}){
    return (
        <div className="w-full border border-gray-primary shadow-md md:h-24 rounded-md p-2 flex flex-col md:flex-row items-center justify-between">
             <img src={product?.images[0]} className="w-full md:w-28 rounded-md h-full" alt="" />
             <Link to={"#"} className="text-xl underline hover:text-blue-700">{product?.title}</Link>
             {/* <p className="text-2xl">title</p> */}
             <p className={`text-green-primary `}>Active</p>
             <p>{product?.stock} stock</p>
             <p>{product.price}</p>
             <div className="flex justify-center gap-1">
                <Link to={""} className="border p-1 lg:p-2 lg:px-3 rounded-md "><RiFileEditFill/></Link>
                <button  className="border cursor-pointer p-2 text-xl rounded-md text-red-500"><FaRegTrashAlt/></button>
             </div>
        </div>
    )
}
export default memo(AdminProductCard)