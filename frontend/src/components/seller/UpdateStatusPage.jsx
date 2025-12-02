import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import { sellerOrdersStatusThunk } from "../../redux/thunks/sellerThunk"

function UpdateStatusPage({setIsUpdating,status,id}){
    const dispatch = useDispatch()
    const [statusInput, setStatusInput] = useState("")

    const handleUpdate =()=>{
        if(!statusInput) return
        dispatch(sellerOrdersStatusThunk({id, status:statusInput}))
        setIsUpdating(false)
    }
    return (
        <div onClick={()=>setIsUpdating(false)} className="min-h-screen w-full bg-black/70 fixed top-0 left-0 flex justify-center items-center">
            <div onClick={(e)=> e.stopPropagation()} className="bg-slate-100 rounded-md w-96  p-2 space-y-5 pb-10">
                <div onClick={()=>setIsUpdating(false)} className="flex justify-between items-center text-2xl">
                     <p>Update status</p>
                    <button className="cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="space-y-3">
                    <p className="text-xl font-bold">Lorem ipsum dolor sit amet.</p>
                    <div className="text-xl flex items-center gap-2"><p>Current Status:</p> <p className={`${status === "PENDING" && "text-yellow-500" || status=== "PROCESSING" && "text-shadow-sky-400" || "text-blue-500" || status==="DELIVERED" && "text-green-primary" || status==="CANCELLED" && "text-red-primary"}`}>{status}</p></div>
                    <select value={statusInput} onChange={(e)=> setStatusInput(e.target.value)} className="w-full p-2 border rounded-md text-2xl cursor-pointer">
                        <option value="">Select status</option>
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                    <button onClick={handleUpdate} className="bg-green-primary text-white w-full p-2 rounded-md cursor-pointer">Update</button>
                </div>
            </div>
        </div>
    )
}
export default memo(UpdateStatusPage)