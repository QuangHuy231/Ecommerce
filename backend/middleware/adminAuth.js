import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
