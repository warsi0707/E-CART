import { memo } from "react"

function FormInput({lable, type,name, value,error, handleChange}){
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-sm">{lable}</label>
            <input name={name} value={value} onChange={handleChange} type={type} placeholder="Type here" className="border border-gray-400 outline-none p-2 text-sm rounded-md"/>
            <p className="text-xs text-red-500">{error}</p>
        </div>
    )
}
export default memo(FormInput)