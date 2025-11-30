import { lazy, useEffect } from "react";
import BackButton from "../components/BackButton";
const CartItemCard = lazy(()=> import("../components/CartItemCard"))
const CartItemPrices = lazy(()=> import("../components/CartItemPrices"))
import {useDispatch, useSelector} from "react-redux"
import { getCart, removeCartItem } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router";


export default function CarItems(){
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.user.carts)
    const navigate = useNavigate()

    const handleRemoveItem = (id)=>{
        dispatch(removeCartItem(id))
    }
    const handleMakeOrder =()=>{
        navigate("/order")
    }
    useEffect(()=>{
        dispatch(getCart())
    },[])
    if(cartItems.length <=0){
        return (
            <div className="w-full lg:w-[1100px] min-h-screen mx-auto py-5 border">
            <div className="flex items-center gap-3 ">
                <BackButton onBack={()=> console.log("clicked")}/>
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
                <BackButton onBack={()=> history.back()}/>
                <h1 className="md:text-xl font-bold">Your basket:</h1>
                <p>{cartItems.length} items</p>
            </div>
            <div className="w-full p-2 lg:w-[1100px] min-h-screen flex flex-col-reverse md:grid grid-cols-8 mx-auto gap-5">
                <div className="min-h-screen w-full col-span-5 flex flex-col gap-3">
                    {cartItems && cartItems.map((item)=>(
                        <CartItemCard key={item._id} item={item} handleRemoveItem={()=> handleRemoveItem(item._id)}/> 
                    ))}
                </div>
                <div className=" w-full  col-span-3 flex flex-col gap-3    rounded-md text-sm">
                    <CartItemPrices title={"Make order"} onNext={handleMakeOrder}/>
                </div>
            </div>
        </div>
    )
}