import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    totalOrderCount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);



// Export Model
export default mongoose.model("order", orderSchema);