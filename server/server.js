import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://brainly-9n6kseg95-anudeep-avulas-projects.vercel.app",
  })
);
dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
