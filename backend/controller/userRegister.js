import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken, hashPasswordHandler } from "./utils/jwt.js";
import crypto from "crypto";
import { sendEmail } from "./common/utils.js";
import { Op } from "sequelize";
export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req?.body;
    const phoneNo = phone;
    const existUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existUser) {
      return res.json({ message: "User already exist", data: [], success: 0 });
    }
    const hashPassword = await hashPasswordHandler(password);
    const createdUser = await User.create({
      name,
      email: email,
      password: hashPassword,
      phoneNo,
    });
    const token = generateToken(createdUser?.id);
    return res.status(201).json({
      message: "User created successfully",
      data: { token },
      success: 1,
    });
  } catch (err) {
    console.log({ err });
    if (err?.name === "SequelizeValidationError") {
      return res.json({
        message: err.errors[0].message,
        success: 0,
      });
    }
    return res.json({ message: "User not created", data: [], success: 0 });
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req?.body;
    const existUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!existUser) {
      return res.json({
        message: "No Record Found, please Sign Up!",
        data: [],
        success: 0,
      });
    }
    const isUserFound = await comparePassword(password, existUser?.password);
    if (isUserFound) {
      const token = generateToken(isUserFound?.id);
      return res.json({
        message: "User successfully LoggedIn",
        data: { username: existUser?.name, token },
        success: 1,
      });
    } else {
      return res.json({
        message: "User not Found",
        data: [],
        success: 0,
      });
    }
  } catch (err) {
    console.log("The error is", err);
    return res.json({ message: "User not Found", data: [], success: 0 });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req?.body;
    const UserExist = await User.findOne({
      where: {
        email,
      },
    });
    if (!UserExist) {
      return res.json({
        message: "No Record Found, please Sign Up!",
        data: [],
        success: 0,
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    UserExist.resetToken = hashedToken;
    UserExist.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    const resetLink = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    await UserExist.save();
    try {
      await sendEmail({
        to: UserExist.email,
        subject: "Password Reset",
        html: `<h3>Password Reset Request</h3>
        <p>Click the below link to reset</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This Link is valid for 15 mins</p>
        `,
      });
      return res.json({ message: "Email send successfully", data: [], success: 0 });
    } catch (mailErr) {
      console.log(`MailErr is ${mailErr}`)
      UserExist.resetToken = null;
      UserExist.resetTokenExpiry = null;
      await UserExist.save();
    }
  } catch (err) {
    console.log(`forgotPassword error is ${err}`);
    return res.json({ message: "Something Went Wrong", data: [], success: 0 });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req?.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const UserExist = await User.findOne({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: { [Op.gt]: new Date() },
      },
    });
    if (!UserExist) {
      return res.json({
        message: "Token is invalid or expired",
        data: [],
        success: 0,
      });
    }
    const hashPassword = await hashPasswordHandler(password);
    UserExist.password = hashPassword;
    UserExist.resetToken = null;
    UserExist.resetTokenExpiry = null;
    await UserExist.save()
    return res.json({message:'Password reset successfully',success:1,data:[]})
  } catch (err) {
    console.log(`resetPassword error is ${err}`);
    return res.json({ message: "Something Went Wrong", data: [], success: 0 });
  }
};
