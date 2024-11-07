import express from "express";

import {
  registerUser,
  loginUser,
  adminLogin,
  logout,
  checkAuth,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.get("/check-auth", verifyToken, checkAuth);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);

authRouter.post("/admin-login", adminLogin);

export default authRouter;
