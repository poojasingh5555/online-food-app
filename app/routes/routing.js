import { dynamicRoute } from "../middleware/dynamicRoute.js";
import { body } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Router } from "express";

const jwtSecret = process.env.JWT_SECRET || "defaultsecret";

const userRoutes = [
  dynamicRoute(
    "/user",
    [
      body("name").isLength({ min: 3 }),
      body("email").isEmail(),
      body("password").isLength({ min: 4 }),
    ],
    async (req, res) => {
      const { name, email, password, location } = req.body;

      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) return res.status(400).json({ success: false, message: "User already exists" });

      const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));
      const user = await User.create({ name, email: email.toLowerCase(), password: hashed, location });

      res.json({ success: true, message: "User registered", userId: user._id });
    }
  ),

  dynamicRoute(
    "/loginuser",
    [
      body("email").isEmail(),
      body("password").isLength({ min: 4 }),
    ],
    async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ success: false, message: "Invalid credentials" });

      const token = jwt.sign({ user: { id: user._id } }, jwtSecret, { expiresIn: "1h" });
      res.json({ success: true, authToken: token });
    }
  ),
];

const router = Router();
userRoutes.forEach(r => router.use(r));
export default router;
