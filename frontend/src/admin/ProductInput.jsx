export default function ProductInput({type,error, label,name, placeholder, handleChange, values}){
    return (
        <div className="flex w-full flex-col gap-2">
            <div className="flex items-center text-md ">
                <label htmlFor="">{label}</label>
            </div>
            <div className="w-full">
            {type === "text-area"? 
                <textarea name={name} value={values} placeholder={placeholder} className="border p-2 w-full rounded-md"  rows={5} id=""></textarea>  :  
                <input name={name} value={values} onChange={handleChange} type={type} placeholder={placeholder} className="border p-2 w-full rounded-md" />
            }
            <p className="text-red-500 text-xs absolute">{error}</p>
            </div>
        </div>
    )
}