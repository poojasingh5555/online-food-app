import express  from "express";
import  mongoose from "mongoose" ;
import  User  from "../models/User.js";
import  { body, validationResult }  from "express-validator" ;
import bcrypt from "bcryptjs" ;
import jwt from "jsonwebtoken";
const router = express.Router();
const jwtSecret = "mynamecdertyui234xcvbnm2345";
  
router.get("/foodData", async (req, res) => {
  try {
    const foodCollection = await mongoose.connection.db.collection("foodData");
    const data = await foodCollection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error("Error fetching food data:", err);
    res.status(500).json({ error: "Failed to fetch food data" });
  }
});




router.post(
  "/user",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 4 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location,
      });
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  }
);
router.post("/loginuser",
  [
      body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 4 }),

  ],
  async (req, res) => {
  
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const { email,password } = req.body;
   if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ error: "User not found" });
    }

    const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
    if (!pwdCompare) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, jwtSecret);
    res.json({ success: true, authToken });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ success: false,
       message: error.message });
  }
});

export default router;

