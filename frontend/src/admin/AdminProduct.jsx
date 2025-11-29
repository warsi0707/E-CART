import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getProductsThunks } from "../redux/thunks/productsThunk";
import { lazy } from "react";

const PostProduct = lazy(()=> import("./PostProduct"))
const AdminProductCard = lazy(()=> import("./AdminProductCard"))


export default function AdminProduct(){
    const dispatch = useDispatch()
    const products = useSelector(state=> state.product.products)
    const [isPosting, setIsPosting] = useState(false)
    useEffect(()=>{
            dispatch(getProductsThunks())
        },[])
    return (
        <>
        <div className="w-full min-h-screen p-3">
            <div className="flex justify-between p-1 w-full items-center ">
                <div className="w-full flex gap-2 items-center ">
                    <input type="text" placeholder="search items" className="hidden sm:flex border bg-gray-primary border-gray-primary outline-purple-primary rounded-md p-1 md:p-3 w-1/3" />
                        <select name="" id="" className="border  p-1 md:p-3 cursor-pointer border-gray-primary outline-purple-primary rounded-md">
                            <option value="" >All category</option>
                            <option value="">All category</option>
                            <option value="">All category</option>
                            <option value="">All category</option>
                        </select>
                        <select name="" id="" className="border cursor-pointer p-1 md:p-3 border-gray-primary outline-purple-primary rounded-md">
                            <option value="" >Status: any</option>
                            <option value="">All category</option>
                            <option value="">All category</option>
                            <option value="">All category</option>
                        </select>
                </div>
                <button onClick={()=>setIsPosting(true)} className="flex justify-center cursor-pointer text-lg items-center bg-purple-primary text-white p-2 rounded-md"> 
                    <p><FiPlus/></p>
                    <p className="hidden md:flex">Add&nbsp;product</p>
                </button>
            </div>
            <div className="flex flex-col gap-2 py-2">
                {products && products.map((product)=>(
                      <AdminProductCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
        {isPosting && <PostProduct setIsPosting={setIsPosting}/>}
        
        </>
    )
}