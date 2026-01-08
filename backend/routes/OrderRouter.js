import express from "express";
import { verifyToken } from "../middleware/jwtverify.js";
const router = express.Router();
import { createOrder,verifyPayment } from "../controller/Orders.js";
router.get("/createOrder", verifyToken, createOrder);
router.post("/verifyPayment", verifyToken, verifyPayment);
export default router