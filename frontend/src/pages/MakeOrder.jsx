import { memo, useCallback, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import OrderAddressCard from "../components/addresses/OrderAddressCard";
import { useSelector, useDispatch } from "react-redux";
import { getAddressThunk, orderThunk } from "../redux/thunks/userSignThunk";
import { Link, useNavigate } from "react-router";
import CartItemPrices from "../components/CartItemPrices";

function MakeOrder() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const addresses = useSelector((state) => state.user.adresses);
  const products = useSelector(state=> state.user.carts) 
  const totalAmount = useSelector(state => state.user.finalCart)
  const [address, setAddress] = useState({});
  const [error, setError] = useState(false)


  useEffect(() => {
    dispatch(getAddressThunk());
  }, []);

  const handleActive = useCallback((item) => {
    setAddress(item);
  }, []);

  const handlePlaceOrder =()=>{
    if(Object.keys(address).length <=0){
      setError(true)
      return
    }
    dispatch(orderThunk({address, products,totalAmount}))
    setError(false)
    // navigate("/placed-order")
  }
  return (
    <div className="w-full p-2 md:w-[900px] mx-auto">
      <div className="mt-2">
        <BackButton onBack={()=> history.back()}/>
      </div>
      <div className="w-full p-2  flex flex-col-reverse  md:grid grid-cols-9 gap-5 min-h-screen justify-between  mx-auto py-10">
        <div className="col-span-5 w-full">
          <div className=" w-full h-full md:h-52 flex flex-col gap-3  py-1 p-2 border-b border-gray-300">
            <p className="text-lg md:text-xl font-semibold">
              Contact information
            </p>
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
            <div className="flex justify-between ">
              <p className="text-lg md:text-xl font-semibold">Shipping address</p>
              {error && <p className="text-red-400">Please select addrress</p>}
            </div>
            {addresses.length <= 0 && (
              <div className="mx-auto flex flex-col items-center py-5">
                <p className="text-2xl">No address found</p>
                <Link
                  to={"/account"}
                  className="text-purple-primary hover:underline"
                >
                  Add new address
                </Link>
              </div>
            )}
            {addresses.length > 0 &&
              addresses.map((item) => (
                <OrderAddressCard
                  key={item._id}
                  item={item}
                  onSelect={() => handleActive(item)}
                  active={address}
                />
              ))}
          </div>
        </div>
         <div className=" w-full  col-span-4 flex flex-col gap-3 brder  rounded-md p-2 text-sm">
            <CartItemPrices title={"Place order"} onNext={handlePlaceOrder}/>
        </div>
      </div>
    </div>
  );
}
export default memo(MakeOrder);
