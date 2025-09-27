const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    try {
      const blacklistedToken = await db("blacklist_tokens").where({ token }).first();
      if (blacklistedToken) {
        return res.status(401).json({ message: "Token has been revoked" });
      }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Attach userId to request object
        req.username=decoded.name;
        req.token=token;
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};