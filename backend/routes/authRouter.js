import express from "express";

import {
  registerUser,
  loginUser,
  adminLogin,
  logout,
  checkAuth,
  updateUserProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.get("/check-auth", verifyToken, checkAuth);
authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);

authRouter.put("/user-profile", verifyToken, updateUserProfile);

authRouter.post("/admin-login", adminLogin);

export default authRouter;
