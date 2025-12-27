import { useState } from "react"

export default function SellerProductSkeleton(){
    const [items, setItem] = useState([1,2,3,4,5,6,7,8])
    return (
        <div className="space-y-5">
            {items.map((item, indx)=> (
                <div key={indx} className="w-full h-14 rounded-md bg-gray-primary"></div>
            ))}
        </div>
    )
}