import express from "express";

import {
  registerUser,
  loginUser,
  adminLogin,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

authRouter.post("/adminlogin", adminLogin);

export default authRouter;
