import { lazy, useEffect } from "react";
import BackButton from "../components/BackButton";
const CartItemCard = lazy(()=> import("../components/CartItemCard"))
const CartItemPrices = lazy(()=> import("../components/CartItemPrices"))
import {useDispatch, useSelector} from "react-redux"
import { getCart, removeCartItem } from "../redux/slices/userSlice";
import { Link } from "react-router";


export default function CarItems(){
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.user.carts)
    const total = useSelector(state => state.user.finalCart)
    console.log(total)

    const handleRemoveItem = (id)=>{
        dispatch(removeCartItem(id))
    }
    useEffect(()=>{
        dispatch(getCart())
    },[])
    if(cartItems.length <=0){
        return (
            <div className="w-full lg:w-[1100px] min-h-screen mx-auto py-5">
            <div className="flex items-center gap-3 ">
                <BackButton/>
                <h1 className="md:text-xl font-bold">Your basket:</h1>
                <p>{cartItems.length} items</p>
            </div>
            <div className="w-full min-h-screen flex flex-col  justify-center items-center pb-40">
                <p className="text-xl md:text-3xl">No cart items found</p>
                <Link to={"/"} className="text-purple-primary hover:underline">Home page</Link>
            </div>
            </div>
        )
    }
    return (
        <div className="w-full lg:w-[1100px] min-h-screen mx-auto py-5 flex flex-col gap-5">
            <div className="flex items-center gap-3 ">
                <BackButton/>
                <h1 className="md:text-xl font-bold">Your basket:</h1>
                <p>{cartItems.length} items</p>
            </div>
            {/* {cartItems.length <=0 
                <div className="w-full min-h-screen flex flex-col  justify-center items-center pb-40">
                <p className="text-xl md:text-3xl">No cart items found</p>
                <Link to={"/"} className="text-purple-primary hover:underline">Home page</Link>
            </div>
            } */}
            <div className="w-full p-2 lg:w-[1100px] min-h-screen flex flex-col-reverse md:grid grid-cols-8 mx-auto gap-5">
                <div className="min-h-screen w-full col-span-5 flex flex-col gap-3">
                    {cartItems && cartItems.map((item)=>(
                        <CartItemCard key={item._id} item={item} handleRemoveItem={()=> handleRemoveItem(item._id)}/> 
                    ))}
                </div>
                <div className=" w-full h-32 col-span-3 flex flex-col gap-3  p-4 border rounded-md text-sm">
                    <CartItemPrices total={total} items={cartItems.length}/>
                    <button className="bg-green-primary text-white text-sm p-2 rounded-md cursor-pointer">Check-Out</button>
                </div>
            </div>
        </div>
    )
}