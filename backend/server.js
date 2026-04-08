import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// ✅ Start server ONLY after DB connects
async function startServer() {
  try {
    await mongoose.connect("mongoose.connect(process.env.MONGO_URI)");

    console.log("DB connected ✅");

    app.listen(5000, () => {
      console.log("Server running on port 5000 🚀");
    });

  } catch (err) {
    console.error("DB ERROR ❌:", err.message);
  }
}

app.use("/api/cart", cartRoutes);

startServer();