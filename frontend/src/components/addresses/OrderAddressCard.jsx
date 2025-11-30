import { memo } from "react";

function OrderAddressCard({item,onSelect,active}) {
  return (
    <button onClick={onSelect} className={`${active._id === item._id ?"border-secondry text-black border-4 ": ""} bg-slate-200 w-full p-2 rounded-md cursor-pointer flex flex-col items-start`}>
      <p className="text-2xl font-semibold">{item.city}</p>
      <p>{item.locality}</p>
      <div className="flex flex-col items-start">
        <p>{item.pin}</p>
        <p>{item.country}</p>
      </div>
    </button>
  );
}
export default memo(OrderAddressCard);
