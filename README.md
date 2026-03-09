# Crown – Premium E-Commerce Application

A full-stack e-commerce web application built with Next.js 14, TypeScript, TypeORM, and SQLite.

## Features

- 🛍️ Product listing with category filtering, search, and sorting
- 🛒 Shopping cart with add, update, and remove functionality
- 🧮 Built-in calculator for discounts, taxes, and totals
- 📦 Order summary with subtotal, shipping, and tax calculation
- 🎨 Dark theme with Crown Gold (#FFD700) accent
- 📱 Fully responsive design
- 🗄️ SQLite database with TypeORM (auto-seeded with 8 products)

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, CSS Modules
- **Backend:** Next.js API Routes
- **Database:** SQLite via `better-sqlite3` + TypeORM
- **Deployment:** Docker + Docker Compose

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Local Development

```bash
# Install dependencies
npm i

# Copy environment file
cp .env .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

The application will be available at [http://localhost:3000](http://localhost:3000).

SQLite database is persisted in a Docker volume (`crown_data`).

### Using Docker Directly

```bash
# Build image
docker build -t crown .

# Run container
docker run -d \
  -p 3000:3000 \
  -v crown_data:/app/data \
  -e DATABASE_PATH=/app/data/crown.db \
  --name crown \
  crown
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_PATH` | `./crown.db` | Path to SQLite database file |
| `NEXT_PUBLIC_APP_NAME` | `Crown` | Application name |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Application URL |
| `NODE_ENV` | `development` | Environment mode |

## API Endpoints

### Products
- `GET /api/products` – List all products
- `POST /api/products` – Create a new product

### Cart
- `GET /api/cart` – Get cart items
- `POST /api/cart` – Add item to cart `{ productId, quantity }`
- `PUT /api/cart` – Update cart item `{ id, quantity }`
- `DELETE /api/cart?id={id}` – Remove cart item
- `DELETE /api/cart?clearAll=true` – Clear entire cart

### Calculator
- `POST /api/calculator` – Perform calculation `{ a, b, operator }`

## Project Structure

```
crown/
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   ├── components/          # Reusable React components
│   ├── entities/            # TypeORM database entities
│   ├── lib/                 # Database setup & utilities
│   └── styles/              # CSS Modules
├── public/
├── Dockerfile
├── docker-compose.yml
└── next.config.js
```
