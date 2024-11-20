import express from "express";
import connectDB from './db/index.js';
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";


const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
dotenv.config();
const port  =  process.env.PORT || 3000;
connectDB();

app.use(express.json());

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.use("/api/v1/user",userRoutes);

app.get("/",(req,res) => {
  res.send("server running");
})  