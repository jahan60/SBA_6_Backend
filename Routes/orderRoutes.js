import express from "express";
import Order from "../Models/orderSchema.js";

const router = express.Router();


// Create Route
router
  .route("/")
  .post(async (req, res) => {
    try {
      let newOrder = await Order.create(req.body);
      res.json(newOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// Get all order
router
  .route("/")
  .get(async (req, res) => {
    try {
      let orders = await Order.find();

      if (!orders || orders.length === 0)
        return res.status(404).json({ error: "No Orders Found" });

      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// Get order by id
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      let order = await Order.findById(req.params.id);

      if (!order)
        return res.status(404).json({ error: "Order Not Found" });

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// Get order by:userId
router.get("/user/:userId", async (req, res) => {
  try {
    let orders = await Order.find({ userId: req.params.userId });

    if (!orders || orders.length === 0)
      return res.status(404).json({ error: "No Orders Found For This User" });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update Route
router
  .route("/:id")
  .put(async (req, res) => {
    try {
      let updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedOrder)
        return res.status(404).json({ error: "Order Not Found" });

      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// Delete Route
router
  .route("/:id")
  .delete(async (req, res) => {
    try {
      let deletedOrder = await Order.findByIdAndDelete(req.params.id);

      if (!deletedOrder)
        return res.status(404).json({ error: "Order Not Found" });

      res.json(deletedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


export default router;


