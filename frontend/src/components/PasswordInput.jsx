import { memo, useState } from "react";

function PasswordInput({label, value, handleChange, error, name}){
    const [isHide, setIsHide] = useState(false) 
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm">{label}</label>
            <div className="border border-gray-400 w-full flex justify-between px-2 rounded-md">
                <input value={value} onChange={handleChange} name={name} type={isHide? "text": "password"} placeholder="Type here" className=" p-2 w-full outline-none text-sm " />
                {isHide? 
                <button onClick={()=> setIsHide(!isHide)} className="cursor-pointer"><i className="fa-regular fa-eye-slash"></i></button>:
                 <button onClick={()=> setIsHide(!isHide)} className="cursor-pointer"><i className="fa-regular fa-eye"></i></button>
                }
            </div>
            <p className="text-xs text-red-500">{error}</p>
        </div>
    )
}
export default memo(PasswordInput)