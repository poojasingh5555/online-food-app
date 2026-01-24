import mongoose from "mongoose";

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

export default Order;
