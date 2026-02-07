import express from "express";
import User from "../Models/userSchema.js";

const router = express.Router();

//Create route
router
.route("/")
.post(async(req, res)=>{
    let newUser = await User.insertOne(req.body);
    res.json(newUser);
});

//Get route 


export default router;