const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { products } = require("../data/products");
const { ApiError } = require("../middleware/errorHandler");

// Shared cart instance (in-memory, single-user MVP)
let cart = new Cart();

// GET /api/cart — get current cart
router.get("/", (req, res) => {
  res.json({ success: true, data: cart.toJSON() });
});

// POST /api/cart/items — add item to cart
router.post("/items", (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return next(new ApiError("productId is required", 400));
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  if (!product.inStock) {
    return next(new ApiError("Product is out of stock", 400));
  }

  cart.addItem(product, quantity);
  res.status(201).json({ success: true, data: cart.toJSON() });
});

// PUT /api/cart/items/:productId — update item quantity
router.put("/items/:productId", (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (quantity === undefined || quantity === null) {
    return next(new ApiError("quantity is required", 400));
  }

  const result = cart.updateItemQuantity(productId, quantity);
  if (!result) {
    return next(new ApiError("Item not found in cart", 404));
  }

  res.json({ success: true, data: cart.toJSON() });
});

// DELETE /api/cart/items/:productId — remove item from cart
router.delete("/items/:productId", (req, res, next) => {
  const item = cart.items.find(
    (item) => item.productId === req.params.productId
  );
  if (!item) {
    return next(new ApiError("Item not found in cart", 404));
  }

  cart.removeItem(req.params.productId);
  res.json({ success: true, data: cart.toJSON() });
});

// DELETE /api/cart — clear entire cart
router.delete("/", (req, res) => {
  cart.clear();
  res.json({ success: true, data: cart.toJSON() });
});

// Export cart reference for orders route
module.exports = router;
module.exports.getCart = () => cart;
module.exports.resetCart = () => {
  cart = new Cart();
  return cart;
};
