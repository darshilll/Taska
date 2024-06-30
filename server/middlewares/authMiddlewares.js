import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Not authorized. Try logging in again.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId).select("isAdmin email");

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found. Please log in again.",
      });
    }

    req.user = {
      email: user.email,
      isAdmin: user.isAdmin,
      userId: userId,
    };

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(401).json({
      status: false,
      message: "Not authorized. Try logging in again.",
    });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Please log in as admin.",
    });
  }
};

export { protectRoute, isAdminRoute };
