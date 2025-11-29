import { memo } from "react";

function AddressInput({label,value,handleChange, placeholder, error, name}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="">{label}</label>
      <div className="w-full">
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          placeholder={placeholder}
        />
        <p className="text-red-400 absolute text-xs">{error}</p>
      </div>
    </div>
  );
}
export default memo(AddressInput)