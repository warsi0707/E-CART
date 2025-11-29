import { memo, useState } from "react"
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { updateStatusThunk } from "../redux/thunks/sellerThunk";

function UpdateStatus({setIsUpdating,id, title,status}){
    const dispatch = useDispatch()
    const [statusInput, setStatusInput] = useState("")

    const handleUpdate =(e)=>{
        e.preventDefault()
        if(!statusInput){
            return
        }
        dispatch(updateStatusThunk({status:statusInput, id}))
        setIsUpdating(false)
    }
    return (
        <div onClick={()=>setIsUpdating(false)} className="bg-black/70 min-h-screen w-full fixed top-0 flex items-center pb-32 left-0">
            <div onClick={(e)=> e.stopPropagation()} className="bg-gray-primary w-96 mx-auto p-2 rounded-md">
                <button onClick={()=> setIsUpdating(false)} className="text-2xl cursor-pointer dark:text-black"><RxCross2/></button>
                <div className="py-5 space-y-3 dark:text-black">
                    <p className="text-xl font-semibold">{title.split('')[0].toUpperCase() + title.split('').splice(1).join('')}</p>
                     <div className="text-xl font-semibold flex items-center gap-2"><p>Current Status:</p> <p className={`${status ==="ACTIVE"? "text-green-primary": "text-red-primary"}`}>{status}</p></div>
                    <select value={statusInput} onChange={(e)=> setStatusInput(e.target.value)} className="border w-full p-2 rounded-md text-xl cursor-pointer">
                        <option value="">Select status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                    <button onClick={handleUpdate} className="bg-slate-primary text-white w-full p-1 rounded-md cursor-pointer">Update</button>
                </div>
            </div>
        </div>
    )
}
export default memo(UpdateStatus)