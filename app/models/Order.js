const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [{ 
    name: String,
    size: String,
    qty: Number,
    price: Number
  }],
  totalPrice: Number,
  orderDate: Date,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
