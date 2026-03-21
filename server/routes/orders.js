const express = require("express");
const router = express.Router();
const { Order, orders } = require("../models/Order");
const { getCart, resetCart } = require("./cart");
const { ApiError } = require("../middleware/errorHandler");

// POST /api/orders — place order from current cart
router.post("/", (req, res, next) => {
  const cart = getCart();

  if (cart.items.length === 0) {
    return next(new ApiError("Cart is empty. Add items before placing an order.", 400));
  }

  const order = new Order(
    cart.items,
    cart.getSubtotal(),
    cart.getTax(),
    cart.getTotal()
  );

  orders.push(order);

  // Clear cart after successful order
  resetCart();

  res.status(201).json({ success: true, data: order.toJSON() });
});

// GET /api/orders — get all orders
router.get("/", (req, res) => {
  const sorted = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json({
    success: true,
    count: sorted.length,
    data: sorted.map((o) => o.toJSON()),
  });
});

// GET /api/orders/:id — get single order
router.get("/:id", (req, res, next) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  res.json({ success: true, data: order.toJSON() });
});

module.exports = router;
