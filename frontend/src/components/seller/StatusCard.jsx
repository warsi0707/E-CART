import { memo } from "react"

function StatusCard({status}){
    return (
        <div className={`${status === "ACTIVE"? "bg-green-secondry text-green-primary": "bg-red-secondry text-red-primary"}  flex items-center p-1 px-2 rounded-full text-sm `}>
            <p>{status=== "ACTIVE"?<i className="fa-solid fa-check"></i>:<i className="fa-solid fa-xmark"></i>}</p>
            <p>{status}</p>
        </div>
    )
}
export default memo(StatusCard)