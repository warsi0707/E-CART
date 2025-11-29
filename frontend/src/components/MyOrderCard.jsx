import { memo } from "react"

function MyOrderCard(){
    return (
        <div className="w-full border border-gray-primary rounded-md p-2 md:px-5">
            <div className="flex justify-between items-center border-b border-gray-primary py-3">
                <div>
                    <p className="md:text-xl font-semibold">Order: #78950</p>
                    <p className="text-xs md:text-sm text-slate-primary">4 Products | By samir warsi | 13.45pm, Nov, 1, 2025</p>
                </div>
                <div className="flex gap-2">
                    <button title="Download invoice" className="flex items-center gap-1 border p-1 rounded-md cursor-pointer border-gray-primary shadow- hover:shadow-2xl">
                        <i class="fa-solid fa-download"></i>
                        <p className="hidden md:flex">Download Invoice</p>
                    </button>
                    <button title="Download invoice" className="flex items-center gap-1 border p-1 rounded-md cursor-pointer border-gray-primary shadow- hover:shadow-2xl">
                       <i class="fa-solid fa-xmark"></i>
                        <p className="hidden md:flex">Cancel</p>
                    </button>
                </div>
            </div>
            <div className="flex gap-10 py-3">
                <div className="flex flex-col items-start ">
                    <p>Status</p>
                    <p>Date</p>
                    <p>Delivery to: </p>
                    
                </div>
                <div className="flex flex-col items-start ">
                    <p>On the way</p>
                    <p>Fri, 13 nov</p>
                    <p>Mumbai</p>
                </div>
            </div>
            <div className="border-t border-gray-primary py-3 w-full grid sm:grid-cols-2 gap-3 ">
                <div className="flex items-center gap-5">
                    <img src="/1.png" className="h-20 w-20 rounded-md" alt="" />
                    <div>
                        <p className="text-2xl">Title</p>
                        <p className="text-sm">Quantity: 1</p>
                        <p className="text-sm">Price: 1200</p>
                    </div>
                </div>
                 <div className="flex items-center gap-5">
                    <img src="/1.png" className="h-20 w-20 rounded-md" alt="" />
                    <div>
                        <p>Title</p>
                        <p>Quantity: 1</p>
                        <p>Price: 1200</p>
                    </div>
                </div>
                 <div className="flex items-center gap-5">
                    <img src="/1.png" className="h-20 w-20 rounded-md" alt="" />
                    <div>
                        <p>Title</p>
                        <p>Quantity: 1</p>
                        <p>Price: 1200</p>
                    </div>
                </div>
                 <div className="flex items-center gap-5">
                    <img src="/1.png" className="h-20 w-20 rounded-md" alt="" />
                    <div>
                        <p>Title</p>
                        <p>Quantity: 1</p>
                        <p>Price: 1200</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(MyOrderCard)