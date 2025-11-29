import MyOrderCard from "../components/MyOrderCard";

export default function MyOrderPage(){
    return (
        <div className="w-full min-h-screen flex flex-col pb-5 gap-5 px-2">
            <MyOrderCard/>
            <MyOrderCard/>
            <MyOrderCard/>
            <MyOrderCard/>
        </div>
    )
}