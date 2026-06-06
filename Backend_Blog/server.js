import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import blogRouter from "./routes/blogRoutes.js";
import jwt from "jsonwebtoken";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
const app=express();

app.use(express.json());
app.use(cors());
app.use('/api/blogs',blogRouter);
app.use('/api/auth',authRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`server running on ${PORT}`);
})

connectDB();