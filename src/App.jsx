import { useReducer, createContext } from "react";
import { cartReducer, initialCart } from "./reducers/cartReducer";
import { products } from "./data/products";
import Products from "./components/Products";
import Cart from "./components/Cart";

export const CartContext = createContext();

function App() {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCart);

  return (
    <div className="app-default">
      <div className="w-full max-w-[644px] grid grid-cols-1 gap-12 lg:gap-24">
        <CartContext.Provider value={{ cart, cartDispatch }}>
          <Products products={products} />
          <Cart />
        </CartContext.Provider>
      </div>
    </div>
  );
}

export default App;
