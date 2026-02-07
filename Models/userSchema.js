import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    phoneNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);




//Export Model
export default mongoose.model("user", userSchema);
