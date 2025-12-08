import { memo } from "react";

function NavButton({ title, icon, activeNav, onSet }) {
  return (
    <button
      onClick={onSet}
      className={`${
        activeNav === title
          ? "bg-purple-secondry text-purple-primary"
          : ""
      } flex p-2 gap-2 cursor-pointer  w-full rounded-md`}
    >
      <p>{icon}</p>
      <p className="hidden md:flex">{title}</p>
    </button>
  );
}
export default memo(NavButton);
