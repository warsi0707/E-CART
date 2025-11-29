import { lazy, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getProductsThunks } from "../redux/thunks/productsThunk";
const CategoryCard = lazy(()=> import("../components/CategoryCard"))
const ProductCard = lazy(()=> import("../components/ProductCard"))

export default function Home(){
    const items = ["Electronics","Fashion","Home-appliances","Beauty","Stationary","Laptops","Mobiles","Glas"]
    const products = useSelector(state => state.product.products)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProductsThunks())
    },[])
    return (
        <div className="w-full px-5 lg:px-0 lg:w-[1100px] min-h-screen py-5 lg:py-10 mx-auto flex flex-col gap-10 mt-1">
            <div className="flex w-full flex-col gap-2 py-">
                <h1 className="text-sm md:text-2xl font-bold">Top Categories</h1>
                <div className="w-full flex flex-wrap justify-center lg:justify-between xl:flex-nowrap gap-2 ">
                    {items.map((item, indx)=>(
                        <CategoryCard key={indx} title={item} />
                    ))}
                </div>
            </div>
            {/* <div className="w-full  h-96">
                <Carousel/>
            </div> */}
            <div className="flex justify-center md:justify-between flex-wrap w-full min-h-screen gap-5">
                {products.length<=0 &&  <p className="mx-auto pt-32 text-3xl">Not found</p>}
                {products && products.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    )
}