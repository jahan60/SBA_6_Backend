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



// Virtuals

orderSchema.set("toJSON", { virtuals: true });

// Virtual: id
orderSchema.virtual("id").get(function () {
  return this._id.toString();
});

// Virtual: formattedAmount
orderSchema.virtual("formattedAmount").get(function () {
  return `$${this.amount.toFixed(2)}`;
});

// Virtual: isLargeOrder
orderSchema.virtual("isLargeOrder").get(function () {
  return this.amount > 100;
});

// Virtual: summary
orderSchema.virtual("summary").get(function () {
  return `Order ${this._id.toString()} by User ${this.userId}`;
});

// Virtual: statusMessage 
orderSchema.virtual("statusMessage").get(function () {
  const messages = {
    pending: "Your order is being processed",
    shipped: "Your order is on the way",
    completed: "Your order has been delivered",
    cancelled: "Your order was cancelled"
  };

  return messages[this.status] || "Unknown status";
});

// Export Model
export default mongoose.model("order", orderSchema);