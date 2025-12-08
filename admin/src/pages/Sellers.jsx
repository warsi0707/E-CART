import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sellersThunk } from "../redux/features/adminThunks"

export default function Sellers(){
    const dispatch = useDispatch()
    const sellers = useSelector(state => state.admin.sellers)

    useEffect(()=>{
        dispatch(sellersThunk())
    },[])
    return (
        <div className="space-y-5">
            <div className="bg-slate-primary w-full flex justify-between p-3 rounded-md border-b border-slate-300">
                <div className="w-full px-5 flex items-center justify-between ">
                <p>Name</p>
                <p>Email</p>
                <p>Mobile</p>
                <p>Address</p>
                <p>Joined at</p>
                </div>
            </div>
            <div>
                {sellers.length<=0 && <p>No sellers found</p>}
                {sellers && sellers.map((seller)=>(
                    <div key={seller._id} className=" w-full flex justify-between p-5 rounded-md border-b border-slate-300">
                        <p>{seller.firstName} {seller.lastName}</p>
                        <p>{seller.email}</p>
                        <p>{seller?.mobile}</p>
                        <p>Address</p>
                        <p>Joined at</p>
                    </div>
                ))}
                
                
            </div>
        </div>
    )
}