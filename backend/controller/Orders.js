import Razorpay from "./utils/razorpay.js";
import Orders from "../models/Order.js";
import crypto from "crypto";
import Order from "../models/Order.js";
import { where } from "sequelize";
import sequelize from "../config/database.js";
import User from "../models/user.js";
import { generateToken } from "./utils/jwt.js";
export const createOrder = async (req, res) => {
  try {
    const newOrder = await Razorpay.orders.create({
      amount: 50000,
      currency: "INR",
    });
    await Orders.create({
      razorpay_order_id: newOrder?.id,
      status: "CREATED",
      userId: req?.user?.id,
    });
    return res.json({
      message: "Order created successfully",
      data: newOrder,
      key_id: process.env.RAZORPAY_KEY_ID,
      success: 1,
    });
  } catch (err) {
    console.log(`Error in createOrder is ${err}`);
    return res.json({ message: "Something went wrong", data: [], success: 0 });
  }
};

export const verifyPayment = async (req, res) => {
  const t = await sequelize.transaction();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req?.body;

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
    if (expectedSignature != razorpay_signature) {
      return res.json({
        message: "Payment verification failed",
        success: 0,
        data: [],
      });
    }
    await Order.update(
      {
        razorpay_payment_id,
        status: "SUCCESS",
      },
      {
        where: {
          razorpay_order_id,
        },
        transaction: t,
      }
    );
    await User.update(
      {
        isPremiumUser: true,
      },
      {
        where: {
          id: req?.user?.id,
        },
        transaction: t,
      }
    );
    const token = generateToken(req?.user?.id,true);
    await t.commit();
    return res.json({ message: "User is premium now", data: {token}, success: 1 });
  } catch (err) {
    await t.rollback();
    console.log(`Error in verifyPayment is ${err}`);
    return res.json({ message: "Something went wrong", data: [], success: 0 });
  }
};
