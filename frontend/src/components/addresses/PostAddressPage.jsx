import { useState } from "react"
import { memo } from "react"
import {  flattenError, z } from "zod"
import { addressSchema } from "../../utils/Schema"
import AddressInput from "./AddressInput"
import { useDispatch } from "react-redux"
import { postAddressThunk } from "../../redux/thunks/userSignThunk"


function PostAddressPage({onClose}){
    const dispatch = useDispatch()
    const [addressData, setAddressData] = useState({
        locality: "",
        city: "",
        country: "",
        pin: ""
    })
    const [error, setError] = useState({})

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setAddressData((prev)=> ({...prev, [name]: value}))
        setError({})
    }
    const handleSubmit =(addressData)=>{
        const {error, success} = addressSchema.safeParse(addressData)
        if(!success){
            setError(flattenError(error).fieldErrors)
            return;
        }
        dispatch(postAddressThunk({locality:addressData.locality,city:addressData.city,country:addressData.country,pin:addressData.pin}))
        onClose()
    }
    return (
        <div onClick={onClose} className="w-full min-h-screen bg-black/70 fixed top-0 left-0 flex justify-center items-center pb-32 p-2">
            <div onClick={(e)=> e.stopPropagation()} className="bg-white w-[500px] flex flex-col gap-5 p-2 rounded-md">
                <div className="flex justify-between items-center">
                    <p className="text-2xl">Add address</p>
                    <button onClick={onClose} className="cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="space-y-5">
                    <AddressInput name={"city"} label={"City"} value={addressData.city} handleChange={handleChange} placeholder={"Your city"} error={error.city}/>
                    <div className="flex gap-2 justify-between">
                        <AddressInput name={"country"} label={"Country"} value={addressData.country} handleChange={handleChange} placeholder={"india"} error={error.country}/>
                        <AddressInput name={"pin"} label={"Pin code"} value={addressData.pin} handleChange={handleChange} placeholder={"Your pin code"} error={error.pin}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Full address</label>
                        <textarea rows={4} type="text" name="locality" value={addressData.locality} onChange={handleChange} className="border p-2 rounded-md" placeholder="address" />
                         <p className="text-red-400 text-xs">{error.locality}</p>
                    </div>
                    <button onClick={()=>handleSubmit(addressData)} className="bg-purple-primary w-full p-2 text-white rounded-md cursor-pointer">Add</button>
                </div>
            </div>
        </div>
    )
}
export default memo(PostAddressPage)