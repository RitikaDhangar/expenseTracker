import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "./utils/jwt.js";
const hashPasswordHandler = async (password) => {
  const saltRound = 10;
  const hashPassword = await bcrypt.hash(password, saltRound);
  return hashPassword;
};
export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req?.body;
    const phoneNo = phone;
    const existUser = await User.findOne({
      where: {
        email: email?.toLowerCase(),
      },
    });
    if (existUser) {
      return res.json({ message: "User already exist", data: [], success: 0 });
    }
    const hashPassword = await hashPasswordHandler(password);
    const User = await User.create({
      name,
      email: email,
      password: hashPassword,
      phoneNo,
    });
    const token = generateToken(User?.id);
    return res.status(201).json({
      message: "User created successfully",
      data: { token },
      success: 1,
    });
  } catch (err) {
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
