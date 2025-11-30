import { Link } from "react-router";

export default function PlacedOrder(){
    return (
        <div className="min-h-screen w-[1100px]  mx-auto py-5 flex justify-center items-center">
            <div className="flex flex-col items-center">
                <p className="text-3xl bg-green-primary text-white p-5 rounded-full"><i className="fa-solid fa-check "></i></p>
                <p className="text-2xl font-bold">Order placed</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <Link to={"/"} className="text-purple-primary underline"><i class="fa-regular fa-house"></i> Home</Link>
            </div>
        </div>
    )
}