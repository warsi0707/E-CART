import { memo } from "react"

function ProductInput({label, name, placeholder, type, error,onchange, value}){
    return (
        <div className="w-full">
            <label htmlFor="">{label}</label>
            <input type={`${type}`} value={value} onChange={onchange}  name={name} className="border p-2 w-full rounded-md outline-none" placeholder={placeholder} />
            <p className="text-sm text-red-500 absolute ">{error}</p>

        </div>
    )
}
export default memo(ProductInput)