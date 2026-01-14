import express from "express";
import { body, validationResult } from "express-validator";
import Order from "../models/Order.js";

const router = express.Router();

const orderValidations = [
  body("items").isArray({ min: 1 }),
  body("items.*.name").notEmpty(),
  body("items.*.qty").isInt({ min: 1 }),
  body("items.*.price").isFloat({ min: 0 }),
  body("orderDate").optional().isISO8601(),
];

// Create order without userId
router.post("/order", orderValidations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { items, orderDate } = req.body;
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const newOrder = new Order({ items, totalPrice, orderDate });
  await newOrder.save();
  res.status(201).json({ success: true, order: newOrder });
});

// Create order for specific user
router.post("/order/:userId", orderValidations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { items, orderDate } = req.body;
  const { userId } = req.params;
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const newOrder = new Order({ items, totalPrice, orderDate, user: userId });
  await newOrder.save();
  res.status(201).json({ success: true, order: newOrder });
});

// Get all orders or by userId
router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  const filter = userId ? { user: userId } : {};

  const orders = await Order.find(filter).sort({ orderDate: -1 });
  res.json({ success: true, orders });
});

export default router;
