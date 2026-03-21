const { v4: uuidv4 } = require("uuid");

class Order {
  constructor(cartItems, subtotal, tax, total) {
    this.id = `ORD-${uuidv4().split("-")[0].toUpperCase()}`;
    this.items = cartItems.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      unit: item.product.unit,
      quantity: item.quantity,
      lineTotal: parseFloat((item.product.price * item.quantity).toFixed(2)),
    }));
    this.subtotal = parseFloat(subtotal.toFixed(2));
    this.tax = parseFloat(tax.toFixed(2));
    this.total = parseFloat(total.toFixed(2));
    this.status = "confirmed";
    this.createdAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      items: this.items,
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}

// In-memory order store
const orders = [];

module.exports = { Order, orders };
