import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { logReq, globalErr } from "./Middleware/middleware.js";
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js"
import userRoutes from "./Routes/userRoutes.js";
import connectDB from "./db/conn.js"



//Setups 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

//Middleware
app.use(express.json());

//Logging middleware
app.use(logReq);

//Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//Global Err Handling 
app.use(globalErr);


//Listner 
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT: ${PORT}`);
});
