import { memo } from "react";

function CartItemPrices({items,total}) {
  return (
    <div className="flex justify-between">
      <p>{items} items: </p>
      <div className="flex items-center">
        <i className="fa-solid fa-indian-rupee-sign"></i>
        <p>{total}</p>
      </div>
    </div>
  );
}
export default memo(CartItemPrices)
