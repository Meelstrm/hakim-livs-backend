# hakim-livs-backend# Hakim Livs – Backend API (Code Showcase)

This repository is a code showcase of the backend part of a fullstack e-commerce project we built as a group of six students at Nackademin.  
Three of us worked on the backend, and three worked on the frontend. Together, we created a grocery store web application called Hakim Livs.

This repository includes only the backend code. I worked alongside two other backend developers to build the structure, API routes, database models, and authentication logic.

---

## Live Demo

The deployed frontend (built by the frontend team) is available here:  
**https://hakim-livs-frontend.vercel.app/**

You can log in as an admin to explore protected features:

- **Email:** admin@melissa.com  
- **Password:** admin123

Admin users can manage products, update prices and stock levels, handle orders, and view customer data. These routes are protected by token-based authentication and admin-only middleware.

---

## About the Backend

The backend is built with Node.js, Express, and MongoDB using Mongoose.  
It includes:

- Token-based authentication with JWT
- Password hashing with bcrypt
- Middleware to protect routes and verify admin access
- CRUD operations for products, categories, users, and orders
- RESTful routing and modular folder structure

The backend was developed and tested together with the frontend using real API requests and live database interaction.

---

## Key Features

- User registration, login, update and deletion
- JWT-based auth with route protection
- Role-based access (admin/user)
- Product and category management
- Order creation and retrieval
- Admin-only endpoints with custom middleware

---

## Technologies Used

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcrypt
- dotenv

---

## Environment Variables

This project uses environment variables stored in a `.env` file (not included).  
See `.env.example` for the structure:

- `PORT` – Port the server runs on
- `MONGO_URI` – Your MongoDB connection string
- `JWT_SECRET` – Secret key for signing tokens

---

## Notes

- This is a code-only version intended for review and learning purposes.
- Frontend code is not included in this repository.
- No real credentials or secrets are published.
