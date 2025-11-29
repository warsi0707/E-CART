import { memo } from "react"

function ProfileBtn({icon, title}){
    return (
        <button className="flex gap-2 items-center w-full p-2 cursor-pointer rounded-sm  hover:bg-purple-secondry border border-gray-300  text-purple-primary">
            <p className="text-purple-primary">{icon}</p>
            <p className="text-sm">{title}</p>
        </button>
    )
}
export default memo(ProfileBtn)