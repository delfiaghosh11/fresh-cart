# 🛒 FreshCart — Premium Grocery Store

A full-stack grocery shopping application built with **Express.js** (backend) and **React + Vite** (frontend).

## Features

- 🍎 **Browse 22+ products** across 6 categories (Fruits, Vegetables, Dairy, Bakery, Beverages, Snacks)
- 🔍 **Search & filter** by name or category
- 🛒 **Cart management** — add, update quantity, remove items
- 💰 **Order placement** with tax calculation & order confirmation
- 📦 **Order history** — view all past orders
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ✨ **Premium UI** — glassmorphism, micro-animations, modern design system

## Quick Start

### 1. Start the Backend

```bash
cd server
npm install
npm run dev
```

Server runs on **http://localhost:4000**

### 2. Start the Frontend

```bash
cd client
npm install
npm run dev
```

App opens on **http://localhost:5173**

## Project Structure

```
fresh-cart/
├── server/                 # Express.js API
│   ├── index.js            # Server entry
│   ├── data/products.js    # Seed data (22 products, 6 categories)
│   ├── models/             # Cart & Order models
│   ├── routes/             # API endpoints
│   └── middleware/         # Error handler
├── client/                 # React + Vite UI
│   ├── src/
│   │   ├── components/     # Navbar, ProductCard, CartItem, etc.
│   │   ├── pages/          # Home, Cart, Orders, OrderConfirmation
│   │   ├── context/        # CartContext (global state)
│   │   ├── services/       # API client
│   │   └── index.css       # Design system
│   └── vite.config.js      # Dev server + API proxy
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products?category=Fruits` | Filter by category |
| GET | `/api/products?search=banana` | Search by name |
| GET | `/api/products/meta/categories` | Get categories |
| GET | `/api/cart` | View cart |
| POST | `/api/cart/items` | Add to cart |
| PUT | `/api/cart/items/:id` | Update quantity |
| DELETE | `/api/cart/items/:id` | Remove from cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Order history |

## Tech Stack

- **Backend**: Node.js, Express.js, UUID
- **Frontend**: React 18, Vite, React Router
- **Styling**: Vanilla CSS (custom design system)
- **State**: React Context API
