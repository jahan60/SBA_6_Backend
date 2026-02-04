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
// get by id 
router
.route("/:id")
.get(async (req, res)=>{
    let product = await Product.findById(req.params.id);

    if(!product) return res.status(404).json({ error: "Product Not Found"});
    res.json(product);
});
//get all 
router
.route("/")
.get(async (req, res)=>{
    let product = await Product.find();

    if(!product) return res.status(404).json({ error: "Product Not Found"});
    res.json(product);
});
//update 




export default router;