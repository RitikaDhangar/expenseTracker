import express from "express";
const router = express.Router();
import { createUser, loginUser,forgotPassword,resetPassword } from "../controller/userRegister.js";
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
export default router;
