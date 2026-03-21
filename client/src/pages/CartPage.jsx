import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function CartPage() {
  const { cart, clearCartItems, checkout, loading } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const order = await checkout();
    if (order) {
      navigate(`/order-confirmation/${order.id}`, { state: { order } });
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any groceries yet. Start shopping to fill your cart!</p>
          <Link to="/" className="empty-state-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Your Cart</h1>
        <p>{cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in your basket</p>
      </div>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items-section">
          <h2>Items</h2>
          {cart.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary" id="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row label">
            <span>Subtotal ({cart.itemCount} items)</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row label">
            <span>Tax (8%)</span>
            <span>${cart.tax.toFixed(2)}</span>
          </div>
          <div className="summary-row label">
            <span>Delivery</span>
            <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            id="checkout-button"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : `Place Order — $${cart.total.toFixed(2)}`}
          </button>

          <button
            className="clear-cart-btn"
            onClick={clearCartItems}
            disabled={loading}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
