import { memo } from "react"
import { GoCheck } from "react-icons/go";
function ProductAmenties(){
    return (
        <div className="flex items-center gap-2"><GoCheck/><p>Lorem ipsum</p></div>
    )
}
export default memo(ProductAmenties)