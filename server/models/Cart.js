const { v4: uuidv4 } = require("uuid");

class Cart {
  constructor() {
    this.id = uuidv4();
    this.items = [];
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        productId: product.id,
        product,
        quantity,
      });
    }

    this.updatedAt = new Date().toISOString();
    return this;
  }

  updateItemQuantity(productId, quantity) {
    const item = this.items.find((item) => item.productId === productId);
    if (!item) return null;

    if (quantity <= 0) {
      return this.removeItem(productId);
    }

    item.quantity = quantity;
    this.updatedAt = new Date().toISOString();
    return this;
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.productId !== productId);
    this.updatedAt = new Date().toISOString();
    return this;
  }

  clear() {
    this.items = [];
    this.updatedAt = new Date().toISOString();
    return this;
  }

  getSubtotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  getTax(rate = 0.08) {
    return this.getSubtotal() * rate;
  }

  getTotal() {
    return this.getSubtotal() + this.getTax();
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  toJSON() {
    return {
      id: this.id,
      items: this.items,
      itemCount: this.getItemCount(),
      subtotal: parseFloat(this.getSubtotal().toFixed(2)),
      tax: parseFloat(this.getTax().toFixed(2)),
      total: parseFloat(this.getTotal().toFixed(2)),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Cart;
