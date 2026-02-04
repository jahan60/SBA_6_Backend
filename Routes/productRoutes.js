import express from "express";
import Product from "../Models/ProductSchema.js";


const router = express.Router();

//Create 
router
.route("/")
.post(async (req, res)=> {
    let newProduct = await Product.inserOne(req.body);
    res.json(newProduct);
})





export default router;