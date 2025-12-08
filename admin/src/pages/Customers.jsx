import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usersThunk } from "../redux/features/adminThunks"

export default function Customers(){
    const dispatch = useDispatch()
    const users = useSelector(state=> state.admin.users)

    useEffect(()=>{
        dispatch(usersThunk())
    },[])
    return(
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
                {users && users.map((user)=>(
                    <div key={user._id} className=" w-full flex justify-between p-5 rounded-md border-b border-slate-300">
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                        <p>{user.mobile}</p>
                        <p>Address</p>
                        <p>Joined at</p>
                    </div>
                ))}
            </div>
        </div>
    )
}