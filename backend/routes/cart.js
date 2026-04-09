import express from "express";
import Cart from "../models/Cart.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET CART
router.get("/", authMiddleware, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    cart = await Cart.create({ userId: req.user.userId, items: [] });
  }

  res.json(cart);
});

// ADD ITEM
router.post("/add", authMiddleware, async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  let cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    cart = new Cart({ userId: req.user.userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ name, price, image, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
});

// REMOVE ITEM
router.delete("/remove/:name", authMiddleware, async (req, res) => {
  const { name } = req.params;

  const cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(item => item.name !== name);

  await cart.save();
  res.json(cart);
});

// UPDATE QUANTITY
router.patch("/update", authMiddleware, async (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity === undefined) {
    return res.status(400).json({ message: "Name and quantity are required" });
  }

  const cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const item = cart.items.find(item => item.name === name);

  if (!item) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  item.quantity = quantity;

  if (item.quantity <= 0) {
    cart.items = cart.items.filter(item => item.name !== name);
  }

  await cart.save();
  res.json(cart);
});

export default router;