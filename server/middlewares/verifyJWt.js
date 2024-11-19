import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "User not authorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Invalid Token", error: error.message });
  }
};

export default verifyJWT;