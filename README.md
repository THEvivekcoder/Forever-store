# Forever Store 🛍️

A full-stack e-commerce platform built with the MERN stack, featuring a customer-facing storefront, a dedicated admin panel, and a REST API backend — with integrated payments, image management, and secure authentication.

---

## 🚀 Live Demo

| Service | Link |
|---|---|
| 🛒 Frontend Storefront | [forever-store-sylo.vercel.app](https://forever-store-sylo.vercel.app/) |
| 🛠️ Admin Panel | [forever-store-gkj2.vercel.app/add](https://forever-store-gkj2.vercel.app) |
| ⚙️ Backend API | [forever-store-odmn.onrender.com](https://forever-store-odmn.onrender.com) |

---

## ✨ Features

### Customer
- Browse and search the product catalog
- Filter products by category and sub-category
- Add, update, and manage cart items
- User registration and login with secure authentication
- Place orders with integrated payment gateways
- View order history and track order status

### Admin
- Secure admin authentication and login
- Add, update, and remove products
- Upload and manage product images via Cloudinary
- View and manage customer orders
- Update order status in real time

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS, Axios |
| **Admin Panel** | React, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT, bcrypt |
| **Image Storage** | Cloudinary |
| **Payments** | Razorpay, Stripe |
| **Deployment** | Vercel (Frontend & Admin), Render (Backend) |

---

## 📁 Project Structure

```text
forever-store/
├── frontend/     # Customer-facing storefront (React + Vite)
├── admin/        # Admin dashboard for product & order management
└── backend/      # REST API, database models, and business logic
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account
- Razorpay / Stripe API keys

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/THEvivekcoder/forever-store.git
   cd forever-store
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file with the required environment variables (MongoDB URI, JWT secret, Cloudinary keys, payment gateway keys), then run:
   ```bash
   npm run server
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Set up the admin panel**
   ```bash
   cd ../admin
   npm install
   npm run dev
   ```

---

## 🔐 Environment Variables

Each app requires its own `.env` file. At minimum, the backend expects:

```env
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
STRIPE_SECRET_KEY=
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request describing your changes.

