import { memo } from "react"

function BackButton(){
    return (
       <button className="flex items-center  gap-1 p-1  rounded-md cursor-pointer transition-all duration-300">
           <i className="fa-solid fa-arrow-left-long"></i>
            <p>Back</p>
       </button>
    )
}
export default memo(BackButton)