import { memo, useCallback, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import OrderAddressCard from "../components/addresses/OrderAddressCard";
import { useSelector, useDispatch } from "react-redux";
import { getAddressThunk, orderThunk } from "../redux/thunks/userSignThunk";
import { Link, useNavigate } from "react-router";
import CartItemPrices from "../components/CartItemPrices";
import { authVerify } from "../redux/slices/userSlice";

function MakeOrder() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {items,loading} = useSelector((state) => state.user.user);

  const addresses = useSelector((state) => state.user.address.items);
  const products = useSelector(state=> state.user.carts) 
  const totalAmount = useSelector(state => state.user.finalCart)
  const [addressInput, setAddressInput] = useState({});
  const [error, setError] = useState(false)

  useEffect(()=>{
    dispatch(authVerify())
  },[])
  useEffect(() => {
    dispatch(getAddressThunk());
  }, [dispatch]);

  const handleActive = useCallback((item) => {
    setAddressInput(item);
    setError(false)
  }, []);

  const handlePlaceOrder =async ()=>{
    if(Object.keys(addressInput).length <=0){
      setError(true)
      return
    }
    const data =await dispatch(orderThunk({address:addressInput, products,totalAmount}))
    setError(false)
    if(data.meta.requestStatus === "fulfilled"){
      navigate(`/placed-order/${data.payload.order._id}`)
    }
    
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
            {loading ? <div>Loading...</div>:
            <div className="flex flex-col gap-3">
              <div className="flex flex-col  justify-between w-full gap-2">
                <div className="flex gap-2 ">
                  <p>{items?.firstName}</p>
                  <p>{items?.lastName}</p>
                </div>
                <p>{items?.email}</p>
                <p>+91 {items?.contact}</p>
              </div>
            </div>}
          </div>
          <div className="h-full w-full flex flex-col gap-3 md:h-60 p-2">
            <div className="flex justify-between ">
              <p className="text-lg md:text-xl font-semibold">Shipping address</p>
              {error && <p className="text-red-400">Please select addrress</p>}
            </div>
            {addresses?.length <= 0 && (
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
            {
              addresses?.map((item) => (
                <OrderAddressCard
                  key={item._id}
                  item={item}
                  onSelect={() => handleActive(item)}
                  active={addressInput}
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
