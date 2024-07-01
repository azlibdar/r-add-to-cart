import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

import { CartContext } from "../App";
import { useContext } from "react";
import PropTypes from "prop-types";

function Cart() {
  const { cart, cartDispatch } = useContext(CartContext);

  const onIncreaseQuantity = (id) => {
    cartDispatch({ type: "INCREASE_QUANTITY", id });
  };

  const onDecreaseQuantity = (id) => {
    const inCart = cart.find((product) => id === product.id);

    if (inCart.quantity === 1) {
      cartDispatch({ type: "REMOVE_FROM_CART", id });
    } else {
      cartDispatch({ type: "DECREASE_QUANTITY", id });
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-full flex flex-col gap-10">
      <h2 className="text-center text-xl font-display tracking-tighter font-medium text-secondary-50">Cart</h2>
      <ul className="w-full p-4 lg:p-6 bg-primary-800 rounded-lg">
        {cart.length === 0 ? (
          <h3 className="w-full text-center text-secondary-300 font-medium">Cart is empty!</h3>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onIncrease={onIncreaseQuantity} onDecrease={onDecreaseQuantity} />
            ))}
            <li className="mt-8">
              <p className="text-secondary-50">Total Price: ${totalPrice.toFixed(2)}</p>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li className="w-full flex justify-between items-center gap-6 py-4 first:pt-0 last:pb-0 border-b border-primary-600 last:border-b-0">
      <div className="flex flex-col gap-1">
        <h3 className="text-base text-secondary-50">{item.name}</h3>
        <p className="text-base font-semibold text-b-yellow">${item.price}</p>
      </div>
      <div className="flex items-center">
        <QuantityButton icon={MinusIcon} onClick={() => onDecrease(item.id)} />
        <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center text-base text-secondary-50">
          {item.quantity}
        </div>
        <QuantityButton icon={PlusIcon} onClick={() => onIncrease(item.id)} />
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

function QuantityButton({ icon: Icon, onClick }) {
  return (
    <button onClick={onClick} className="bg-b-green w-[40px] h-[40px] rounded-md flex items-center justify-center">
      <Icon className="size-5 fill-primary-900" />
    </button>
  );
}

QuantityButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cart;
