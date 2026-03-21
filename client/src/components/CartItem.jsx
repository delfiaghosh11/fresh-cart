import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const lineTotal = (item.product.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item" id={`cart-item-${item.productId}`}>
      <div className="cart-item-image">
        <img src={item.product.image} alt={item.product.name} />
      </div>

      <div className="cart-item-info">
        <div className="cart-item-name">{item.product.name}</div>
        <div className="cart-item-price">
          ${item.product.price.toFixed(2)} / {item.product.unit}
        </div>
      </div>

      <div className="cart-item-controls">
        <button
          className="qty-btn"
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <span className="cart-item-total">${lineTotal}</span>

      <button
        className="cart-item-remove"
        onClick={() => removeItem(item.productId)}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
}
