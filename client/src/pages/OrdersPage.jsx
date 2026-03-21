import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Your Orders</h1>
        <p>Track and review your past grocery orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h2>No orders yet</h2>
          <p>
            Once you place an order, it will appear here. Start shopping to get
            fresh groceries delivered!
          </p>
          <Link to="/" className="empty-state-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/order-confirmation/${order.id}`}
              state={{ order }}
            >
              <div className="order-card" id={`order-${order.id}`}>
                <div className="order-card-header">
                  <span className="order-card-id">{order.id}</span>
                  <span className="order-status">{order.status}</span>
                </div>

                <div className="order-card-items">
                  {order.items.map((item) => item.name).join(", ")}
                </div>

                <div className="order-card-footer">
                  <span className="order-card-total">
                    ${order.total.toFixed(2)}
                  </span>
                  <span className="order-card-date">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
