import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../App";

function Products({ products }) {
  const { cartDispatch } = useContext(CartContext);

  return (
    <div className="w-full flex flex-col gap-10">
      <h2 className="text-center text-xl font-display tracking-tighter font-medium text-secondary-50">Store</h2>
      <ul className="w-full">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onAddToCart={cartDispatch} />
        ))}
      </ul>
    </div>
  );
}

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

function ProductItem({ product, onAddToCart }) {
  return (
    <li className="w-full flex justify-between items-center gap-6 py-4 first:pt-0 border-b border-primary-600 last:border-b-0">
      <div className="flex flex-col gap-1">
        <h3 className="text-base text-secondary-50">{product.name}</h3>
        <p className="text-base font-semibold text-b-yellow">${product.price}</p>
      </div>
      <button
        onClick={() => onAddToCart({ type: "ADD_TO_CART", id: product.id })}
        className="py-2.5 h-min px-5 rounded-md text-sm font-bold text-primary-900 bg-b-yellow"
      >
        Add to cart
      </button>
    </li>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Products;
