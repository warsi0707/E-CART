import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/slices/userSlice";
import { Link } from "react-router";

function CartItemPrices({ title, onNext }) {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.user.carts);
  const finalPrice = useSelector((state) => state.user.finalCart);

  useEffect(() => {
    dispatch(getCart());
  }, []);
  return (
    <div className="flex flex-col gap-4 border p-2 rounded-md border-gray-400">
      {carts &&
        carts.map((cart) => (
          <div
            key={cart._id}
            className="flex justify-between items-end border border-slate-300 shadow-md p-1 rounded-md "
          >
            <div>
              <Link to={""} className="text-purple-primary hover:underline">
                {cart.title}
              </Link>
              <p className="text-sm">Quantity: {cart.quantity}</p>
              <p>Price: {cart.price}</p>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-indian-rupee-sign"></i>
              <p>{cart.amount}</p>
            </div>
          </div>
        ))}
      <div className="flex justify-between w-full p-2 text-xl border-t border-gray-400">
        <p>{carts.length} items: </p>
        <div className="flex items-center ">
          <i className="fa-solid fa-indian-rupee-sign"></i>
          <p>{finalPrice}</p>
        </div>
      </div>
      <button
        onClick={onNext}
        className="bg-green-primary text-white text-sm p-2 rounded-md cursor-pointer"
      >
        {title}
      </button>
    </div>
  );
}
export default memo(CartItemPrices);
