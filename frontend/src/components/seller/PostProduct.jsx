import { memo, useState } from "react"
import ProductInput from "./ProductInput";
import { productSchema } from "../../utils/Schema";
import { z }from "zod"
import { useDispatch, useSelector } from "react-redux";
import { postProductThunk } from "../../redux/thunks/sellerThunk.js";

function PostProduct({setIsPosting}){
    const dispatch = useDispatch()
    const loading = useSelector(state=> state.seller.loading)
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        category: '',
        discount: '',
        stock: '',
        description:"",
    })
    const [images, setImages] = useState(null)
    const [error, setError] = useState({})

    const handleChnage =(e)=>{
        const {name, value} = e.target;
        setProductData((prev)=>({...prev, [name]: value}))
        setError({})
    }
    const handlePost =(e)=>{
        e.preventDefault()
        const {error, success} = productSchema.safeParse(productData)
        if(!success){
            setError(z.flattenError(error).fieldErrors)
            return;
        }
        const formData = new FormData()

        formData.append("title", productData.title)
        formData.append('description', productData.description)
        formData.append('price', parseInt(productData.price))
        formData.append('category', productData.category)
        formData.append('discount', productData.discount)
        formData.append('stock', productData.stock)
        if (images) {
            Array.from(images).forEach((file) => {
                formData.append("images", file);
            });
        }
         dispatch(postProductThunk(formData))
        setIsPosting(false)
    }

    return(
        <div onClick={()=> setIsPosting(false)} className="min-h-screen w-full fixed top-0 left-0 flex justify-center items-center p-2 pb-32 bg-black/70">
            <div onClick={(e)=> e.stopPropagation()} className="dark:text-black bg-white space-y-5 w-full md:w-[600px] rounded-md p-3 mx-auto ">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Post your item</h1>
                    <button onClick={()=> setIsPosting(false)} className="text-2xl cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <form action="" onSubmit={handlePost} encType="multipart/form-data">
                <div className="space-y-5">
                    <ProductInput label={"Title"} type={'text'} name={'title'} value={productData.title} onchange={handleChnage} placeholder={"Title"} error={error.title}/>
                    <div className="flex gap-2">
                         <ProductInput label={"Price"} type={'number'} name={'price'} value={productData.price} onchange={handleChnage} placeholder={"1200"} error={error.price}/>
                         <ProductInput label={"Category"} type={'text'} name={'category'} value={productData.category} onchange={handleChnage} placeholder={"product types"} error={error.category}/>
                    </div>
                    <div className="flex gap-2">
                         <ProductInput label={"Discount"} type={'number'} name={'discount'} value={productData.discount} onchange={handleChnage} placeholder={"10%"} />
                         <ProductInput label={"Stock"} type={'number'} name={'stock'} value={productData.stock} onchange={handleChnage} placeholder={"No. of product"} error={error.stock}/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="">Image</label>
                        <input type="file" onChange={(e)=> setImages(e.target.files)} multiple  name="images" className="border p-2 w-full rounded-md outline-none"  />
                    </div>
                    <div className="w-full">
                        <label htmlFor="">Product details</label>
                       <textarea name="description" value={productData.description} onChange={handleChnage} rows={5} placeholder="About product " className="border p-2 w-full rounded-md outline-none" ></textarea>
                       <p className="text-sm text-red-500 absolute ">{error.description}</p>
                    </div>
                    <button type="submit" className="bg-purple-primary text-white w-full p-2 rounded-md cursor-pointer">{loading? "Uploading...": "Upload"}</button>
                </div>
                </form>
            </div>
        </div>
    )
}
export default memo(PostProduct)