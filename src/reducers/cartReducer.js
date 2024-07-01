import { products } from "../data/products";

export const initialCart = [];

export function cartReducer(cart, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const alreadyInCart = cart.find((product) => action.id === product.id);

      if (!alreadyInCart) {
        const item = products.find((product) => product.id === action.id);
        return [...cart, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
      } else {
        return cart.map((item) => (item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
    }
    case "INCREASE_QUANTITY":
      return cart.map((item) => (item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item));
    case "DECREASE_QUANTITY":
      return cart.map((item) => (item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item));
    case "REMOVE_FROM_CART":
      return cart.filter((item) => item.id !== action.id);
    default:
      return cart;
  }
}
