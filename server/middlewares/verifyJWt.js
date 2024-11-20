import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res
        .status(401)
        .send({ message: "Token is required for authorization" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Token has expired"
        : "Invalid token";
    return res
      .status(401)
      .send({ message: errorMessage, error: error.message });
  }
};

export default verifyJWT;
