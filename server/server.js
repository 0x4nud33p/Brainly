import express from "express";
import connectDB from './db/index.js';
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

const app = express();
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