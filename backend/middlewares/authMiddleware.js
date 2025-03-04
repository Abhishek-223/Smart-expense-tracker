import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  // Get token from request headers
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next(); // Move to next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default protect;
