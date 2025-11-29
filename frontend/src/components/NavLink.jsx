import { memo } from "react";
import { Link } from "react-router";

function NavLink({title, icon, links}){
    return (
        <Link to={links} title={title}className="flex flex-col items-center text-primary hover:text-purple-primary">
            <p className="text-lg font-bold ">{icon}</p>
            <p className="text-xs font-thin hover:underline">{title}</p>
        </Link>
    )
}
export default memo(NavLink)