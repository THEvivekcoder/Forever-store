# Forever Store 🛍️

A full-stack e-commerce web application built with the MERN stack. It includes a customer-facing storefront, an admin dashboard for managing products and orders, and a Node.js/Express backend with MongoDB.

---

## Live Demo

| App | URL |
|-----|-----|
| Frontend | _coming soon_ |
| Admin Panel | _coming soon_ |
| Backend API | https://forever-store-odmn.onrender.com |

---

## Features

### Customer Storefront
- Browse products by category and sub-category
- Search and filter products
- Add to cart, update quantities, remove items
- User registration and login (JWT auth)
- Place orders with Cash on Delivery
- View order history

### Admin Panel
- Secure admin login
- Add new products with up to 4 images (uploaded to Cloudinary)
- List and remove products
- View and manage all orders
- Update order status

### Backend API
- RESTful API built with Express.js
- MongoDB with Mongoose for data storage
- JWT-based authentication for users and admin
- Cloudinary integration for image uploads
- Razorpay and Stripe payment gateway support
- Multer for handling multipart/form-data

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Tailwind CSS, Axios, Vite |
| Admin | React 18, React Router v6, Tailwind CSS, Axios, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Image Storage | Cloudinary |
| Payments | Razorpay, Stripe |

---

## Project Structure

```
forever-store/
├── frontend/       # Customer-facing React app
├── admin/          # Admin dashboard React app
└── backend/        # Express.js REST API
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB Atlas account
- Cloudinary account
- Razorpay account (for payments)

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourpassword

MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the server:

```bash
npm run server     # development (nodemon)
npm start          # production
```

The API runs on `http://localhost:4000`.

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the dev server:

```bash
npm run dev
```

Runs on `http://localhost:5173`.

---

### 3. Admin Setup

```bash
cd admin
npm install
```

Create a `.env` file in the `admin` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the dev server:

```bash
npm run dev
```

Runs on `http://localhost:5174`.

---

## API Endpoints

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login user |
| POST | `/api/user/admin` | Admin login |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/product/list` | Get all products |
| POST | `/api/product/add` | Add product (admin) |
| POST | `/api/product/remove` | Remove product (admin) |
| POST | `/api/product/single` | Get single product |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/add` | Add item to cart |
| POST | `/api/cart/update` | Update cart item |
| POST | `/api/cart/get` | Get user cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/order/place` | Place COD order |
| POST | `/api/order/stripe` | Place Stripe order |
| POST | `/api/order/razorpay` | Place Razorpay order |
| POST | `/api/order/userorders` | Get user orders |
| POST | `/api/order/list` | Get all orders (admin) |
| POST | `/api/order/status` | Update order status (admin) |

---

## Deployment

| Service | Platform |
|---------|----------|
| Backend | [Render](https://render.com) |
| Frontend | [Vercel](https://vercel.com) |
| Admin | [Vercel](https://vercel.com) |

Set the respective environment variables in each platform's dashboard before deploying.

---

## License

This project is for educational purposes.
