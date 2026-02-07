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

//Get all product 
router
.route("/")
.get(async(req, res)=>{
    let users = await User.find();

    if(!users) return res.status(404).json({ error: "Users not Found" });
res.json(users);

});

//Get by id
router
.route("/:id")
.get(async (req, res)=>{
    let user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ error: "User Not found"});
    res.json(user);
});

//update route
router
.route("/:id")
.put(async (req, res)=>{
let updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
);

if (!updatedUser) return res.status(404).json({error: "User Not Found" });
res.json(updatedUser);
});

//Delete route
router
.route("/:id")
.delete(async (req, res)=>{
    let deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status (404).json({error: "User Not Found"});
    res.json(deletedUser);
});





export default router;