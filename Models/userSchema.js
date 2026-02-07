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

//Virtuals
userSchema.set("toJSON", { virtuals: true });

//virtual :id 
userSchema.virtual("id").get(function () {
  return this._id.toString();
});

//Virtual for exact first name 
userSchema.virtual("firstName").get(function () {
  return this.name.split(" ")[0];
});

//virtuals for last 4 digit phone number 
userSchema.virtual("phoneLast4").get(function () {
  return this.phoneNumber.slice(-4);
});

//Password length 
userSchema.virtual("maskedPassword").get(function () {
  return "*".repeat(this.password.length);
});


//Export Model
export default mongoose.model("user", userSchema);
