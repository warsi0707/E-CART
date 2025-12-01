export default function HomeSkeleton(){
    return (
        <div className="w-full px-5 lg:px-0 lg:w-[1100px] min-h-screen py-5 lg:py-10 mx-auto flex flex-col gap-10 mt-">
            <div className=" w-full flex flex-wrap justify-center lg:justify-between xl:flex-nowrap gap-2 ">
               {[1,2,3,4,5,6,7,8].map((item)=>  <div key={item} className="w-32 h-32 bg-slate-300 rounded-md"></div>)}
            </div>
            <div className="flex justify-center md:justify-between flex-wrap w-full min-h-screen gap-5">
                {[1,2,3,4,5,6,7,8].map((item)=> <div key={item} className="bg-slate-300 rounded-md h-64 w-60"></div>)}
            </div>
        </div>
    )
}