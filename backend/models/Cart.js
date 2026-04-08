import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);