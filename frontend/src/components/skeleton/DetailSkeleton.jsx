export default function DetailSkeleton(){
    return (
        <div className="w-full p-2 md:w-[1100px] min-h-screen mx-auto flex flex-col gap-5 py-10">
            <p className="w-32 h-10 bg-slate-300 rounded-md"></p>
            <p className="w-72 h-10 bg-slate-300 rounded-md"></p>
            <div className="w-full h-96 bg-slate-300"></div>
        </div>
    )
}