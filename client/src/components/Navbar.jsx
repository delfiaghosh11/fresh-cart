import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-icon">🛒</span>
          FreshCart
        </Link>

        <div className="navbar-actions">
          <Link
            to="/"
            className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Shop
          </Link>
          <Link
            to="/orders"
            className={`navbar-link ${location.pathname === "/orders" ? "active" : ""}`}
          >
            Orders
          </Link>
          <Link to="/cart" className="cart-button" id="cart-nav-button">
            🛍️ Cart
            {cart.itemCount > 0 && (
              <span className="cart-badge" key={cart.itemCount}>
                {cart.itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
