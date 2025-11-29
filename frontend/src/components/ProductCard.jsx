import { memo } from "react"
import { Link } from "react-router"
import Star from "./Star";
import {useDispatch} from "react-redux"
import { addToCart } from "../redux/slices/userSlice";

function ProductCard({product}){
    const dispatch = useDispatch()

    const handleAddToCart =()=>{
        dispatch(addToCart(product))
    }
    return (
        <div className="h-96 w-60 flex flex-col gap-2 relative">
            <img src={`http://localhost:3000/${product?.images[0]}`} className="h-60 rounded-md bg-gray-primary " alt="" />
            <div className="flex flex-col gap-1">
                <Link to={`/product/${product._id}`} className="text-xs hover:text-purple-primary text-start font-light">{product.title}</Link>
                <p className="text-xs">{product?.category}</p>
                {/* <button className="absolute top-2 right-3 border border-gray-200 bg-text-primary text-2xl p-1 cursor-pointer rounded-md"><i className="fa-regular fa-heart"></i></button> */}
                <div className="flex gap-">
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                </div>
                <div className="flex items-center font-bold text-purple-primary">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    <p>{product.price}.00</p>
                </div>
                <button onClick={handleAddToCart} className=" dark:bg-slate-200 dark:text-black bg-gray-primary   flex items-center justify-center p-2 gap-2 rounded-md text-sm cursor-pointer" >
                   <i className="fa-solid fa-cart-plus "></i>
                    <p>Add to cart</p>
                </button>
            </div>
        </div>
    )
}
export default memo(ProductCard)