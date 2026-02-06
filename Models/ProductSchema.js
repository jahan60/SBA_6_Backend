import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        price : {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },

        inStock: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true}

);

//Virtuals in JSON
productSchema.set("toJSON", { virtuals: true });

//Virtual:  id
productSchema.virtual("id").get(function(){
    return this._id.toString();
});

//Virtual: inStockStatus
productSchema.virtual("inStockStatus").get(function(){
    return this.inStock? "In Stock": "Out of Stock";
});
 
//Virtual: on price discount
productSchema.virtual("discountedPrice").get(function(){
    //If 10% discount 
    const discount = 0.10;
    return this.price - this.price * discount;
});

//Indexes
productSchema.index({ title: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ category: 1, price: -1 });

//Instance method on one product
productSchema.methods.isExpensive = function (){
    return this.price > 50;
};

//Static method on the whole collection
productSchema.statics.findByCategory = function (category){
    return this.find({ category });
};

//Export Model
export default mongoose.model("Product", productSchema);
