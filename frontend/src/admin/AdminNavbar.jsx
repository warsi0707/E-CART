import {Link} from "react-router"
import { FaUser } from "react-icons/fa";

export default function AdminNavbar(){
    return (
        <div className="w-full p-2 border-b border-gray-400 px-5 md:px-10 flex items-center justify-between">
            <Link to={"/"} className="text-xl md:text-2xl">Admin</Link>
            <div className="flex items-center gap-2">
                <input type="text" className="border rounded-md p-2 bg-slate-secondry border-gray-primary " placeholder="search" />
                <Link to={"/admin-dashboard"} title="Admin Dashboard" className="bg-gray-primary p-3 md:p-2 rounded-md flex items-center gap-2">
                    <p><FaUser/></p>
                    <p className="hidden">My account</p>
                </Link>
            </div>
        </div>
    )
}