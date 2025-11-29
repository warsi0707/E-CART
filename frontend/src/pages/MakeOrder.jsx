import { memo } from "react"
import FormInput from "../components/FormInput"
import CheckOutCard from "../components/CheckOutCard"
import BackButton from "../components/BackButton"
import OrderAddressCard from "../components/addresses/OrderAddressCard"
import { useSelector, useDispatch } from "react-redux"

function MakeOrder(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const address = useSelector(state => state.user.adresses)
    console.log(address)
    console.log(user)
    return (
       <div className="w-full p-2 md:w-[900px] mx-auto">
        <div className="mt-2">
            <BackButton/>
        </div>
         <div className="w-full p-2  flex flex-col-reverse md:grid grid-cols-9 gap-5 min-h-screen  mx-auto py-10">
            <div className="col-span-5 w-full">
                <div className=" w-full h-full md:h-52 flex flex-col gap-3  py-1 p-2 border-b border-gray-400">
                    <p className="text-lg md:text-xl font-semibold">Contact information</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col  justify-between w-full gap-2">
                           <div className="flex gap-2 ">
                            <p>{user.firstName}</p>
                           <p>{user.lastName}</p>
                           </div>
                           <p>{user.email}</p>
                          <p>+91 {user.contact}</p>
                        </div>
                </div>
            </div>
            <div className="h-full w-full flex flex-col gap-3 md:h-60 p-2">
               <p className="text-lg md:text-xl font-semibold">Shipping address</p>
               <OrderAddressCard/>
               <OrderAddressCard/>
               <OrderAddressCard/>
               <OrderAddressCard/>
            </div>
            </div>
            <div className=" col-span-4  w-full">
                <CheckOutCard/>
            </div>
        </div>
       </div>
    )
}
export default memo(MakeOrder)