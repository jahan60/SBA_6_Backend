import express from "express";
import Product from "../Models/ProductSchema.js";


const router = express.Router();

//Create Route
router
.route("/")
.post(async (req, res)=> {
    let newProduct = await Product.insertOne(req.body);
    res.json(newProduct);
});

//Get Route

//get all products
router
.route("/")
.get(async (req, res)=>{
    let products = await Product.find();

    if(!products) return res.status(404).json({ error: "Product Not Found"});
    res.json(products);
});


// get by id 
router
.route("/:id")
.get(async (req, res)=>{
    let product = await Product.findById(req.params.id);

    if(!product) return res.status(404).json({ error: "Product Not Found"});
    //Instance method
    const expensive = product.isExpensive();
    res.json({ product, isExpensive: expensive });
});

 //get by Category
 router
 .get ("/category/:category", async (req, res) =>{

    //Static method 
let products = await Product.findByCategory(req.params.category); //example URL "http://localhost:3000/api/products/category/Fitness"

if (!products || products.length === 0)
    return res.status(404).json({ error: "No Products Found" });

res.json(products);
});


//update 
router
.route("/:id")
.put(async (req, res)=>{
let updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
);

if (!updatedProduct) return res.status(404).json({error: "Product Not Found" });
res.json(updatedProduct);

});

//Delete 
router
.route("/:id")
.delete(async (req, res)=>{
    let deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status (404).json({error: "Product Not Found"});
    res.json(deletedProduct);
});



export default router;