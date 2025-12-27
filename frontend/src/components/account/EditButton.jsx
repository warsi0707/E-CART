import { memo } from "react"

function EditButton({handleClick}){
    return(
       <button onClick={handleClick} className="bg-gray-primary p-2.5 px-3 rounded-md cursor-pointer"><i className="fa-solid fa-pen-to-square"></i></button>
    )
}
export default memo(EditButton)