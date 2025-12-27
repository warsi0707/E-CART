import { Suspense, useEffect } from "react";
import { lazy } from "react";
import {useDispatch, useSelector} from "react-redux"
import { deleteAddressThunk, getAddressThunk } from "../redux/thunks/userSignThunk";
import { useState } from "react";
import AddressSkeleton from "../components/skeleton/AddressSkeleton";
const AddressCard = lazy(()=> import("../components/addresses/AddressCard"))
const PostAddressPage = lazy(()=>import("../components/addresses/PostAddressPage"))


export default function UserAddress(){
    const dispatch = useDispatch()
    const {addressLoading, items} = useSelector(state=> state.user.address)
    const [isPosting, setIsPosting] = useState(false)

    const handleRemoveAddress =(id)=>{
        dispatch(deleteAddressThunk(id))
    }

    useEffect(()=>{
        dispatch(getAddressThunk())
    },[dispatch])
    // if(addressLoading){
    //     return (
    //         <AddressSkeleton/>
    //     )
    // }
    return (
        <>
        <div className="w-full flex flex-col gap-5  min-h-screen px-2">
            <div className="flex justify-end">
                <button onClick={()=> setIsPosting(true)} className="flex  items-center bg-purple-primary p-2 rounded-md text-white gap-2 cursor-pointer">
                    <i className="fa-solid fa-plus"></i>
                    <p>Add Address</p>
                </button>
            </div>
            <div className="w-full flex flex-col md:grid grid-cols-2 gap-2 ">
                {items?.length <=0 && <p className="flex justify-center items-center w-full">No address</p>}
                <Suspense fallback={<AddressSkeleton/>}>
                {items?.length >0 && items?.map((item)=> (
                     <AddressCard key={item._id} item={item} handleRemoveAddress={()=> handleRemoveAddress(item._id)}/>
                ))}
                </Suspense>
            </div>
        </div>
        {isPosting && <PostAddressPage onClose={()=> setIsPosting(false)}/>}
        </>
    )
}