import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import * as api from "../services/api";

export default function OrderConfirmation() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    if (!order && id) {
      api
        .getOrder(id)
        .then((res) => setOrder(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, order]);

  if (loading) {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h2>Order not found</h2>
          <p>We couldn't find that order. It may have expired or the ID is incorrect.</p>
          <Link to="/" className="empty-state-btn">Go Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container checkout-page">
      <div className="order-confirmation">
        <div className="order-success-icon">✓</div>
        <h1>Order Placed!</h1>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: 8 }}>
          Thank you for your purchase. Your fresh groceries are on the way!
        </p>
        <div className="order-id">{order.id}</div>

        {/* Order Items */}
        <div className="order-details-card">
          <h3>Order Items</h3>
          {order.items.map((item, i) => (
            <div className="order-item-row" key={i}>
              <span className="item-name">
                {item.name} × {item.quantity}
              </span>
              <span className="item-total">${item.lineTotal.toFixed(2)}</span>
            </div>
          ))}

          <div
            className="order-item-row"
            style={{
              borderTop: "1px solid var(--color-border-light)",
              paddingTop: 12,
              marginTop: 12,
            }}
          >
            <span className="item-name">Subtotal</span>
            <span className="item-total">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="order-item-row">
            <span className="item-name">Tax</span>
            <span className="item-total">${order.tax.toFixed(2)}</span>
          </div>
          <div
            className="order-item-row"
            style={{ fontWeight: 700, fontSize: "1.05rem" }}
          >
            <span>Total</span>
            <span style={{ color: "var(--color-primary-dark)" }}>
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/orders" className="empty-state-btn" style={{ background: "var(--color-text)", padding: "12px 24px", borderRadius: 9999, color: "black", fontWeight: 600 }}>
            View All Orders
          </Link>
          <Link to="/" className="empty-state-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
