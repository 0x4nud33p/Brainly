import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const signUp = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Please provide username and password" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User already exists, please log in" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    return res
      .status(201)
      .send({ message: "User signed up successfully", user: newUser });
  } catch (error) {
    console.error("Error during sign up:", error);
    return res
      .status(500)
      .send({ message: "Error during sign up", error: error.message });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

 
  if (!username || !password) {
    return res
      .status(400) 
      .send({ message: "Please provide username and password" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found. Please sign up." });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401) 
        .send({ message: "Invalid username or password" });
    }

    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1D" }
    );

   
    return res
      .status(200)
      .send({ message: "User logged in successfully", token, userid : user._id });
  } catch (error) {
    console.error("Error during sign in:", error);
    return res
      .status(500)
      .send({ message: "Error during sign in", error: error.message });
  }
};

export { signUp, signIn };