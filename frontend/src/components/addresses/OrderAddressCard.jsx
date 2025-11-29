import { memo } from "react";

function OrderAddressCard() {
  return (
    <button className=" bg-slate-200 text-black w-full  p-2 rounded-md cursor-pointer flex  flex-col items-start border-4 border-secondry ">
      <p className="text-2xl font-semibold">Mumbai</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <div className="flex flex-col items-start">
        <p>400612</p>
        <p>India</p>
      </div>
    </button>
  );
}
export default memo(OrderAddressCard);
