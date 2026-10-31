require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const http = require("http");
const { Server } = require("socket.io");
const User = require("./models/User"); 
const Notification = require("./models/Notification");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const helmet = require("helmet");
const validator = require("validator");
const sanitize = require("mongo-sanitize");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const OtpModel = require("./models/Otp");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// === Firebase Admin SDK Import (Push Notifications) ===
const admin = require('firebase-admin');
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin Initialized Successfully!");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

const app = express();
const server = http.createServer(app);

// ================= CORS & SECURITY =================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ================= SANITIZE =================
app.use((req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.params) req.params = sanitize(req.params);
  next();
});

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const onlineUsers = {};
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
  socket.on("join", (email) => {
    if (email) onlineUsers[email] = socket.id;
  });
  socket.on("disconnect", () => {
    for (let email in onlineUsers) {
      if (onlineUsers[email] === socket.id) delete onlineUsers[email];
    }
  });
});

// ================= AUTH MIDDLEWARE =================
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: "No token provided" });

    if (token.startsWith("Bearer ")) token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ msg: "User not found" });
    if (user.banned) return res.status(403).json({ msg: "Your account is banned." });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token expired or invalid" });
  }
});

// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Atlas Connected for Kacha Bazaar"))
  .catch((err) => console.log("MongoDB Error:", err.message));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "kacha-bazaar",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: Date.now() + "-" + file.originalname
  })
});
const upload = multer({ storage });

// ================= ROOT ENDPOINT =================
app.get("/", (req, res) => {
  res.send("Kacha Bazaar Grocery Backend Live");
});

// ================= AUTH ROUTES =================
app.post("/register", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    if (!name || !mobile || !email || !password) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    const lowerEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) return res.status(400).json({ msg: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name.trim(),
      mobile: mobile.trim(),
      email: lowerEmail,
      password: hashedPassword,
      role: "user"
    });

    await newUser.save();
    return res.status(201).json({ success: true, msg: "Registered Successfully" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.banned) return res.status(403).json({ msg: "Your account is banned" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      msg: "Login Successful",
      token,
      role: user.role || "user",
      email: user.email,
      name: user.name
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

// ================= PUSH NOTIFICATIONS & FCM =================
app.post('/api/save-fcm-token', async (req, res) => {
  const { userId, fcmToken } = req.body;
  try {
    if (!userId || !fcmToken) return res.status(400).json({ error: "Missing fields" });
    await User.findByIdAndUpdate(userId, { fcmToken });
    res.status(200).json({ message: "FCM Token saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ================= SERVER LISTEN =================
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Kacha Bazaar Backend running on port ${PORT}`);
});
