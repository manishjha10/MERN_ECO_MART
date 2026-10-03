# 🛍️ Eco Mart – MERN E-Commerce Website

Eco Mart is a **full-stack e-commerce web application** built using the **MERN stack**.  
The application provides a simple and user-friendly shopping experience where users can browse products, filter products by category, view product details, manage their cart, and place orders.

The project also includes an **admin dashboard** for managing products,categories, customers, orders, inventory, and other store operations.

---

## 📌 Project Overview

Eco Mart is designed as a modern online shopping platform supporting multiple product categories such as:

- 👕 Shirts
- 👕 T-Shirts
- 👖 Jeans
- 🧥 Jackets
- 🧥 Hoodies
- 👓 Eyeglasses
- 🕶️ Sunglasses
- 👓 Reading Glasses
- 🔵 Blue-Cut Glasses
- 👜 Handbags
- 🎒 Backpacks

The project demonstrates the implementation of a complete e-commerce workflow using React on the frontend and Node.js, Express.js, and MongoDB on the backend.

---

## ✨ Features

### 👤 User Features

- User registration and login
- User authentication
- Browse products
- Product category filtering
- Product search
- Product details page
- Product ratings and reviews
- Add products to cart
- Update cart quantity
- Remove products from cart
- Wishlist functionality
- Checkout and order placement
- Payment gateway integration
- Order history
- Responsive shopping interface
- Customer appointment/booking functionality for supported optical services
- AI chatbot assistance

### 🛒 Product Features

- Multiple product categories
- Product images
- Product price and details
- Product ratings
- Customer reviews
- Product availability/stock management
- Featured/trending products
- Search and filtering
- Pagination for product listing

### 🔐 Admin Features

The admin panel provides centralized management of the e-commerce platform.

- Admin authentication
- Dashboard with store information
- Product management
  - Add product
  - Edit product
  - Publish/hide product
  - Soft delete product
  - Product image management
- Category management
- Brand management
- Coupon management
- Customer management
- Order management
- Appointment management
- Payment management
- Inventory management
- Stock adjustment
- Notifications
- Activity logs
- Reports
- CMS/content management
- Store settings
- Branch management
- Staff management
- Lens/product management

---

## 🖥️ Screenshots

### 🏠 Home Page

The home page contains the navigation bar, promotional banner, product sections, shopping options, cart, search, and user account controls.

![Eco Mart Home Page](https://github.com/manishjha10/Certificates/blob/Phots_Eco_Mart_Wensite/Screenshot%202026-10-03%20191147.png)

---

### 🧥 Jackets Product Listing

Users can select a category and browse the available products. Each product card displays the product image, name, price, rating, reviews, and a **View Details** button.

![Jackets Products](https://github.com/manishjha10/Certificates/blob/Phots_Eco_Mart_Wensite/Screenshot%202026-10-03%20191310.png)

---

### 👕 T-Shirt Product Listing

Products can be displayed category-wise, making it easier for users to find products based on their requirements.

![T-Shirt Products](https://github.com/manishjha10/Certificates/blob/Phots_Eco_Mart_Wensite/Screenshot%202026-10-03%20191229.png)

---

### 🔥 Trending Products

The application provides a **Trending Now** section to highlight selected products.
![Trending Products](https://github.com/manishjha10/Certificates/blob/Phots_Eco_Mart_Wensite/Screenshot%202026-10-03%20191207.png).

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS / CSS
- React Toastify
- Material UI Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- REST APIs

### Services & Integrations

- Cloudinary – Image upload and storage
- Razorpay – Payment processing
- Botpress – AI chatbot
- Email service – User/admin notifications

---

## 🏗️ Project Architecture

```text
Eco-Mart
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── services
│   │   ├── assets
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   ├── config
│   └── server.js
│
└── README.md
```

> The exact folder names may vary depending on the current project structure.

---

## 🔄 Application Flow

```text
User
  │
  ▼
Frontend (React + Vite)
  │
  │ REST API
  ▼
Backend (Node.js + Express)
  │
  ├── Authentication
  ├── Products
  ├── Cart
  ├── Orders
  ├── Payments
  ├── Reviews
  └── Admin Operations
  │
  ▼
MongoDB
```

For external services:

```text
Frontend
   │
   ▼
Backend
   ├── Cloudinary → Product Images
   ├── Razorpay   → Payments
   └── Botpress   → Chatbot
```

---

## 🔑 Authentication

The application uses authentication to protect user and admin resources.

### Authentication Flow

```text
Register / Login
       ↓
Backend validates user
       ↓
JWT generated
       ↓
Authenticated request
       ↓
Protected API / Dashboard
```

JWT-based authentication is used to protect APIs and admin functionality.

---

## 💳 Payment Integration

Eco Mart integrates **Razorpay** for online payments.

Basic payment flow:

```text
User
 ↓
Add Product to Cart
 ↓
Checkout
 ↓
Create Order
 ↓
Razorpay Payment
 ↓
Payment Verification
 ↓
Order Confirmation
```

---

## ☁️ Image Management

Product images are handled using **Cloudinary**.

```text
Admin uploads image
        ↓
Backend receives image
        ↓
Cloudinary stores image
        ↓
Image URL saved with product
        ↓
Frontend displays image
```

This avoids storing large image files directly inside MongoDB.

---

## 🗄️ Database

MongoDB is used as the primary database.

Important collections/models include:

- Users
- Admins
- Products
- Categories
- Brands
- Orders
- Reviews
- Coupons
- Payments
- Appointments
- Branches
- Staff
- Notifications
- Activity Logs

Mongoose is used for schema definition and database interaction.

---

## 🔍 Product Search & Filtering

The product section supports:

- Category filtering
- Product search
- Product pagination
- Product availability
- Product details
- Ratings and reviews

Example:

```text
User selects "Jackets"
        ↓
Frontend sends category request
        ↓
Backend API filters products
        ↓
MongoDB returns matching products
        ↓
React displays product cards
```

---

## 📦 Order & Inventory Management

When a user places an order:

```text
Cart
 ↓
Checkout
 ↓
Payment
 ↓
Order Created
 ↓
Stock Updated
 ↓
Order Visible in Admin Panel
```

Inventory management supports stock adjustment and restoration when required.

---

## ⭐ Rating & Review System

Users can provide ratings and reviews for products.

Product cards display:

- Star rating
- Number of reviews
- Product details

This helps users understand previous customer feedback.

---

## 🤖 AI Chatbot

The project includes an AI chatbot to assist users while browsing the website.

The chatbot can be used for:

- Basic product assistance
- User queries
- Navigation assistance
- Store-related questions

Botpress is used for chatbot integration.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd eco-mart
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```


### Start Backend

```bash
cd backend
npm run dev
```

Backend will run on:

```text
http://localhost:5001
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🚀 Deployment

The project can be deployed using:

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB Atlas

### Images

- Cloudinary

### Payments

- Razorpay

Deployment architecture:

```text
                    ┌──────────────┐
                    │    User      │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Vercel     │
                    │   Frontend   │
                    └──────┬───────┘
                           │
                        REST API
                           │
                           ▼
                    ┌──────────────┐
                    │    Render    │
                    │   Backend    │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ MongoDB  │ │Cloudinary│ │ Razorpay │
        │  Atlas   │ │  Images  │ │ Payments │
        └──────────┘ └──────────┘ └──────────┘
```

---

## 📱 Responsive Design

The application is designed to provide a consistent shopping experience across:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 📚 What I Learned

Through this project, I worked with:

- MERN stack development
- REST API development
- React component architecture
- Redux state management
- MongoDB database design
- Mongoose models
- JWT authentication
- Admin dashboard development
- Payment gateway integration
- Cloudinary image management
- API integration
- Inventory management
- Order management
- Deployment using Vercel and Render
- Git and GitHub

---

## 🔮 Future Improvements

Possible future improvements include:

- Advanced product recommendation system
- AI-based product recommendations
- Advanced analytics dashboard
- Real-time order tracking
- More payment options
- Improved mobile UI
- Advanced search using filters
- Email/SMS order notifications
- Coupon and offer optimization

---

## 👨‍💻 Author

**Manish Jha**

B.Tech Computer Science Engineering

### Technologies

`React` `Node.js` `Express.js` `MongoDB` `Redux` `JavaScript` `REST API` `Cloudinary` `Razorpay`

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
