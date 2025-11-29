export default function CategoryCard({title}){
    return (
        <div className="flex  md:w-32  flex-col items-center">
            <div className="bg-purple-secondry w-10 h-10 md:w-28 rounded-md md:h-24 flex items-center justify-center ">
                <img src="/logo/logo-shape.svg" className="w-16 h-14" alt="" />
            </div>
            <p className="text-xs md:text-sm">{title}</p>
        </div>
    )
}