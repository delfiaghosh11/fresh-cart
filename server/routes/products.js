const express = require("express");
const router = express.Router();
const { products, categories } = require("../data/products");
const { ApiError } = require("../middleware/errorHandler");

// GET /api/products — list all products, with optional category & search filters
router.get("/", (req, res) => {
  const { category, search } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
});

// GET /api/products/:id — get single product
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.json({ success: true, data: product });
});

// GET /api/categories — list categories
router.get("/meta/categories", (req, res) => {
  res.json({ success: true, data: categories });
});

module.exports = router;
