import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router"
import { decreaseQnt, increaseQnt } from "../redux/slices/userSlice"

function CartItemCard({item,handleRemoveItem}){
    const dispatch = useDispatch()
    const [qnt, setQnt] = useState(item.quantity)

    const handleIncrease =(id)=>{
        setQnt(prev => prev+1)
        dispatch(increaseQnt(id))
    }
    const handleDecrease =(id)=>{
        setQnt(prev => prev-1)
        dispatch(decreaseQnt(id))
    }
    return (
        <div className="w-full flex justify-between border border-gray-400 rounded-md p-1">
            <div className="flex gap-4">
                <img src={`http://localhost:3000/${item.images[0]}`} className="h-20 w-20 rounded-md" alt="" />
                <div className="flex flex-col justify-between">
                    <Link to={"#"} className="= text-xs md:text-sm text-purple-primary hover:underline">{item.title}</Link>
                    <p className="text-sm">Price: {item.price}</p>
                    <div className="flex border w-20 justify-between rounded-md">
                        <button onClick={()=>handleDecrease(item._id)} className="bg-primary px-1 cursor-pointer rounded-l-md hover:bg-purple-primary"><i className="fa-solid fa-minus"></i></button>
                        <p>{qnt}</p>
                        <button onClick={()=> handleIncrease(item._id)} className="bg-primary px-1 cursor-pointer rounded-r-md hover:bg-purple-primary"><i className="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col  justify-between pr-2">
                <button onClick={handleRemoveItem} className=" cursor-pointer border p-1 justify-center flex items-center border-gray-200 hover:bg-purple-primary rounded-md "><i className="fa-solid fa-xmark"></i></button>
                <div className="flex items-center">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    <p>{item.amount}</p>
                </div>
            </div>
        </div>
    )
}
export default memo(CartItemCard)