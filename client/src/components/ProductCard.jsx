import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity, loading } = useCart();

  const cartItem = cart.items.find((item) => item.productId === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card-category">{product.category}</span>
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span className="out-of-stock-badge">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>

        <div className="product-card-footer">
          <div className="product-price">
            <span className="product-price-value">
              ${product.price.toFixed(2)}
            </span>
            <span className="product-price-unit">per {product.unit}</span>
          </div>

          <span className="product-rating">⭐ {product.rating}</span>
        </div>

        {quantity > 0 ? (
          <div className="product-added-controls" style={{ marginTop: "12px" }}>
            <div className="added-badge">
              <span className="tickmark">✓</span> Added
            </div>
            <div className="cart-item-controls in-card">
              <button
                className="qty-btn"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={loading}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                disabled={loading}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <button
            className="add-to-cart-btn"
            id={`add-to-cart-${product.id}`}
            disabled={!product.inStock || loading}
            onClick={() => addToCart(product.id)}
            style={{ marginTop: "12px" }}
          >
            {product.inStock ? "🛒 Add to Cart" : "Unavailable"}
          </button>
        )}
      </div>
    </div>
  );
}
