require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const mongproductsRoute = require("./routes/mongproducts.js");
const categorysRoute = require("./routes/categoryRoute.js");
const auth = require("./routes/auth.js");
const userOrders = require("./routes/userOrderRoute.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed origins for CORS
const allowedFrontend = [
  "https://hakim-livs-frontend.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedFrontend,
  credentials: true,
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// API routes
app.use("/api/products", mongproductsRoute);
app.use("/api/category", categorysRoute);
app.use("/api/users", auth);
app.use("/api/orders", userOrders);

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

module.exports = app;
