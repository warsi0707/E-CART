import { useState } from "react";
import ProductInput from "./ProductInput";
import { RxCross2 } from "react-icons/rx";
import {useDispatch}from "react-redux"
import { postProductThunk } from "../redux/thunks/sellerThunk";


export default function PostProduct({setIsPosting}){
    const dispatch = useDispatch()
    const [productData, setProductdata] = useState({
        title: "",
        description: "",
        price: 0,
        category: "",
        discount: 0,
        stock: 0
    })
    const [images, setImages] = useState(null)
    const [error, setError] = useState({})

    const validate = (inputData)=>{
        const errorData = {}
        if(!inputData.title){
            errorData.title = "Title required"
        }
        if(!inputData.description){
            errorData.description = "Description required"
        }
        if(!inputData.price){
            errorData.price = "price required"
        }
        if(!inputData.category){
            errorData.category = "Category required"
        }
        if(!inputData.stock){
            errorData.stock = "Stock required"
        }
       
        setError(errorData)
        return errorData
    }
    const handleChange =(e)=>{
        const {name, value} = e.target
        setProductdata((prev)=> ({...prev, [name]:value}))
        setError({})
    }
    
    const handleSubmit =(e)=>{
        e.preventDefault()
        
        
        const errors = validate(productData)
        if(!Object.keys(errors).length <=0){
            return
        }        
        const formData = new FormData()
        // formData.append("title", productData.title)
        // formData.append("description", productData.description)
        // formData.append("price", productData.price)
        // formData.append("category", productData.category)
        // formData.append("discount", productData.discount)
        // formData.append("stock", productData.stock)
        formData.append("photos", images)
        dispatch(postProductThunk({formData}))
    }
    return (
        <div onClick={()=> setIsPosting(false)} className=" w-full min-h-screen fixed top-0 left-0 bg-black/10 backdrop-blur-md flex justify-center items-center">
            <div onClick={(e)=> e.stopPropagation()} className="bg-white flex flex-col gap-5 w-[700px] p-5 rounded-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Upload product</h1>
                    <button onClick={()=> setIsPosting(false)} className="text-2xl cursor-pointer"><RxCross2/></button>
                </div>
                <form  action="" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col gap-5">
                        <ProductInput values={productData.title} handleChange={handleChange} name={'title'} label={"Product Title"} error={error.title} placeholder={'Title'} type={"text"}/>
                        <div className="flex gap-2">
                            <ProductInput values={productData.price} name={"price"} handleChange={handleChange} label={"Product Price"} error={error.price} placeholder={'1200inr'} type={"number"}/>
                            <ProductInput values={productData.category} name={"category"} handleChange={handleChange} label={"Category"} error={error.category} placeholder={'Shoes, electronic...'} type={"text"}/>
                        </div>
                        <div className="flex gap-5">
                            <ProductInput values={productData.discount} name={"discount"} handleChange={handleChange} label={"Discount % "} placeholder={'10%'} type={"number"}/>
                            <ProductInput values={productData.stock} handleChange={handleChange} name={'stock'} label={"Product quantity"} error={error.stock} placeholder={'5'} type={"number"}/>
                        </div>
                         <div className="flex w-full flex-col gap-2">
                            <div className="flex items-center text-md ">
                                <label htmlFor="">Upload images</label>
                            </div>
                            <div className="w-full"> 
                                <input multiple name="image" onChange={(e)=> setImages(e.target.files)} type={'file'} className="border p-2 w-full rounded-md" />
                            <p className="text-red-500 text-xs absolute">{error.images}</p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                             <label htmlFor="">Description</label>
                            <div className="w-full">
                                <textarea value={productData.description} onChange={handleChange} name="description"  placeholder="product content" className="border p-2 w-full rounded-md"  rows={5} id=""></textarea>
                            <p className="text-red-500 text-xs absolute">{error.description}</p>
                            </div>
                        </div>
                       
                        <button  type="submit" className="bg-purple-primary text-white p-2 rounded-md text-md cursor-pointer">Post</button>
                </div>
                 </form>
            </div>
        </div>
    )
}