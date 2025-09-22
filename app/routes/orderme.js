
const express = require("express");
const Order = require("../models/Order.js"); 

const orderroute = express.Router();

orderroute.post("/order", async (req, res) => {
  try {
    const { items, totalPrice, orderDate } = req.body;
    const newOrder = new Order({ items, totalPrice, orderDate });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err });
  }
});


module.exports = orderroute;;
