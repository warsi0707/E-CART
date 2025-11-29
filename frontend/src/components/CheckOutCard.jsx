import { memo } from "react"
import CartItemPrices from "./CartItemPrices"

function CheckOutCard(){
    return (
        <div className="h-52 w-full col-span-3 flex flex-col gap-3  p-4 border border-gray-400 rounded-md text-sm">
            <CartItemPrices/>
            <CartItemPrices/>
            <CartItemPrices/>
            <CartItemPrices/>
            <button className="bg-green-primary text-white text-sm p-2 rounded-md cursor-pointer">Check-Out</button>
        </div>
    )
}
export default memo(CheckOutCard)