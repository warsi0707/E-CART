import { memo } from "react";

function AddressCard({item,handleRemoveAddress}){
    return (
        <div className="border p-3 w-full flex justify-between rounded-md border-gray-primary shadow-md">
            <div>
                <h1 className="text-xl md:text-2xl font-bold">{item?.city.split('')[0].toUpperCase() + item?.city.split('').splice(1).join('')}</h1>
                <p>{item.locality} </p>
                <p>{item.country}</p>
                <p>{item.pin}</p>
            </div>
            <div className="flex gap-2 items-start">
                <button onClick={handleRemoveAddress} className="cursor-pointer text-xl"><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    )
}
export default memo(AddressCard)