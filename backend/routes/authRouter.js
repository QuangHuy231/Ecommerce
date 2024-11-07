import express from "express";

import {
  registerUser,
  loginUser,
  adminLogin,
  logout,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);

authRouter.post("/admin-login", adminLogin);

export default authRouter;
