import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import {useDispatch, useSelector} from "react-redux"
import { productsThunk } from "../redux/features/adminThunks";

export default function Products() {
  const dispatch = useDispatch()
  const {items, loading} = useSelector(state=> state.admin.products)

  useEffect(()=>{
    dispatch(productsThunk())
  },[])
  if(loading ){
    return (
      <div className="space-y-2">
          {[1,2,3,4,5].map((item, indx)=>(
            <div key={indx} className="h-24 bg-slate-100 border border-gray-400 rounded-md w-full"></div>
          ))}
        </div>
    )
  }
  return (
    <div className="min-h-screen w-full p-3 space-y-3">
     <div className="flex justify-between">
       <div className="space-x-1">
        <input type="text" className="bg-slate-secondry border p-2 rounded-md" placeholder="Search by product"/>
        <button className="bg-slate-primary p-2 px-3 rounded-md cursor-pointer border"><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <button className="flex items-center bg-purple-primary text-white p-2 rounded-md">
        <i className="fa-solid fa-plus"></i>
        <p>Add product</p>
      </button>
     </div>
      <div className="bg-slate-primary w-full flex justify-between p-3 rounded-md border-b border-slate-300">
        <div className="w-1/2  flex items-center gap-32 px-6">
          <p>Image</p>
          <p>Title</p>
        </div>
        <div className="w-full  flex items-center justify-between">
          <div className="flex items-center w-full justify-evenly">
            <p>Status</p>
            <p>Inventory</p>
          </div>
          <div className="flex w-full justify-evenly ">
            <p>PRice </p>
            <p>Action</p>
          </div>
        </div>
      </div>
      <div>
        
        {items.map((product)=>(
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>

    </div>
  )
}
