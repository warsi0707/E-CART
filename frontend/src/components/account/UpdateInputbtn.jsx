import { memo } from "react";

function UpdateInputbtn({placeholder,error, value, handlceClick, handleChnage}) {
  return (
    <div className="flex flex-col gap-2">
     {error &&  <p className="text-red-primary text-sm">{error}</p>}
      <div className="flex gap-2 md:flex-row flex-col">
         <input value={value} onChange={handleChnage} type="text" className="border w-full rounded-md p-1" placeholder={placeholder} />
        <button onClick={handlceClick} className="bg-skyblue-primary text-white p-1 px-3 rounded-md cursor-pointer">Update</button>
      </div>
    </div>
  );
}

export default memo(UpdateInputbtn)
