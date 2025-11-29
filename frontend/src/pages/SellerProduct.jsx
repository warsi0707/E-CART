import { lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProductThunk, getSellerProductThunk, removeProductThunk} from "../redux/thunks/sellerThunk";
const PostProduct = lazy(()=> import("../components/seller/PostProduct"))
const SellerProcutCard = lazy(()=> import("../components/seller/SellerProcutCard"))

function SellerProduct(){
    const dispatch = useDispatch()
    const [isPosting, setIsPosting] = useState(false)
    const [category, setCategory] = useState("")
    const products = useSelector(state=> state.seller.products)

    const handleDeleteProduct =(id)=>{
        dispatch(removeProductThunk(id))
    }
    useEffect(()=>{
        dispatch(filterProductThunk(category))
    },[category])
    useEffect(()=>{
        dispatch(getSellerProductThunk())
        
    },[dispatch])
    return (
        <>
        <div className="border  w-full min-h-screen rounded-md border-gray-primary space-y-5 p-2">
            <div className="flex justify-end gap-2">
                <select value={category} onChange={(e)=> setCategory(e.target.value)} className="border p-2 rounded-md border-gray-400 text-sm cursor-pointer">
                    <option value="" >Select Category</option>
                    <option value="home-appliances">Home-appliances</option>
                    <option value="Electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="beauty">Beauty</option>
                </select>
                <button onClick={()=> setIsPosting(true)} className="bg-purple-primary text-white px-2 rounded-md cursor-pointer flex items-center gap-1">
                   <i className="fa-solid fa-plus"></i>
                    <p>Add product</p>
                </button>
            </div>
            <div className="space-y-2">
                <div className=" border-0 border-primary   w-full p-2 flex justify-between px-3 rounded-sm">
                    <p >Image</p>
                    <p>Title</p>
                    <p>Status</p>
                    <p>stock</p>
                    <p>Price</p>
                    <p>Actions</p>
                </div>
                <div className="flex flex-col gap-2">
                    {products.length <=0 && <p className="text-2xl text-center pt-10">No products</p>}
                    {products && products.map((product)=>(
                        <SellerProcutCard key={product._id} product={product}  onDelete={()=> handleDeleteProduct(product._id)}/>
                    ))}
                </div>
            </div>
        </div>
        {isPosting && <PostProduct setIsPosting={setIsPosting} />}
        </>
    )
}
export default memo(SellerProduct)