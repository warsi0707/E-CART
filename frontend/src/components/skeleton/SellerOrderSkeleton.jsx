export default function SellerOrderSkeleton(){
    return (
        <div className="space-y-5">
            {[1,2,3].map((item, indx)=>(
                <div key={indx} className="w-full h-52 bg-gray-primary rounded-md"></div>
            ))}
        </div>
    )
}