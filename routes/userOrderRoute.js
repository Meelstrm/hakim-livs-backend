const express = require("express");
const mongoose = require("mongoose");
const Order = require('../models/userOrders.js');
const mongoproducts = require("./models/mongoproducts.js");
const { authenticateToken, isAdmin } = require("../middleware/auth.js")

const router = express.Router();

router.get("/", authenticateToken, isAdmin, async (req, res) => {
    try {
        const {status} = req.query;
        let query = {}

        if(status) {
            query.status = status
        }

    const orders = await Order.find(query)
    .sort({ createdAt: -1})
    .populate("user.userId", "username mobileNumber")
    .populate("products.productId", "name price description img");
    
    res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Kunde inte hämta ordrar"})
    }
})

router.get("/myOrders", authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ "user.userId": req.user.id}).sort({createdAt: -1});

        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Kunde ej hämta dina ordrar"})
    }
});

router.get("/:id", authenticateToken, isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate("user.userId", "username mobileNumber")
        .populate("products.productId", "name price description img");

        if (!order) {
            return res.status(404).json({ message: "Kunde ej hitta order"});
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Kunde ej hämta ordern"})
    
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
      const { products, total } = req.body;
  
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Produkter krävs för att lägga en order" });
      }

      const formattedProducts = await Promise.all(products.map(async (p) => {
        if (!p.productId || !mongoose.Types.ObjectId.isValid(p.productId)) {
          throw new Error(`Ogiltig produkt-ID: ${p.productId}`);
        }
      const product = await mongoproducts.findById(p.productId); 
      
        if (!product) 
          {
             throw new Error(`Produkt med ID ${p.productId} hittades inte`);
          }
      
        return {
          productId: product._id, 
          name: product.name,
          price: product.price,
          quantity: p.quantity,
          img: product.img,
          description: product.description
        }; 
      }));
  
      const order = new Order({
        user: {
          userId: req.user.id, 
          email: req.user.email,
          mobileNumber: req.user.mobileNumber 
        },
        products: formattedProducts,
        total,
      });
  
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Kunde inte skapa order', error: err.message });
    }
  });

router.put('/:id', authenticateToken, isAdmin, async (req, res) => {

    try {
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id, 
        {$set: req.body},
        {new: true, 
        runValidators: true}
    );

    if(!updatedOrder) {
        return res.status(404).json({ message: "Order hittades ej"});
    }

    res.status(200).json({ message: "Order uppdaterad:", updatedOrder});

    } catch (error) {
        console.error(error)
        res.status(400).json({message: "Uppdatering misslyckades!", error: error.message});
    }
});

router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {

    try {

        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if(!deletedOrder) {
            return res.status(404).json({message: "Orden hittades ej"});
        }
        res.json({message: "Orden borttagen:", deletedOrder})
    } catch (error) {
        res.status(500).json({message: "Kunde inte ta bort order"});
    }
});


module.exports = router;