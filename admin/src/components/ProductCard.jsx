import { memo } from "react";
import { Link } from "react-router";

const api = import.meta.env.VITE_BACKEND_URL;

function ProductCard({product}){
    return (
       <div className=" w-full h-20 flex justify-between rounded-md border-b border-slate-300 p-2">
        <div className="w-1/2  flex items-center gap-10 ">
          <img src={`${api}/${product?.images[1]}`} className="h-full w-20 rounded-md" alt="" />
          <p>{product?.title}</p>
        </div>
        <div className="w-full  flex items-center justify-between">
          <div className="flex items-center w-full justify-evenly">
            {product?.status === 'ACTIVE' ?
            <div className="flex items-center bg-green-secondry p-1 text-xs border border-green-primary rounded-full md:px-5">
                <i className="fa-solid fa-check"></i>
                <p className="">{product.status}</p>
            </div>:
            <div className="flex items-center bg-red-secondry  p-1 text-xs border border-red-primary text-red-primary rounded-full md:px-5">
                <i className="fa-solid fa-xmark"></i>
                <p className="">{product.status}</p>
            </div>
          }
            
            <p>{product?.stock} in stock</p>
          </div>
          <div className="flex w-full justify-evenly">
           <div className="flex items-center">
            <i className="fa-solid fa-indian-rupee-sign"></i>
            <p>{product?.price}</p>
           </div>
            <div className="flex items-center gap-1">
                <Link to={""} className="p-2 border rounded-md border-gray-400 border-b-black">Details</Link>
                <button className="p-2 border rounded-md border-gray-400 border-b-black">Edit</button>
                <button className="p-2 border rounded-md border-red-primary text-red-primary "><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    )
}
export default memo(ProductCard)