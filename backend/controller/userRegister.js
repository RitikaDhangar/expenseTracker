const User = require("../models/user");
const bcrypt = require('bcrypt');
const hashPasswordHandler = async(password) => {
  const saltRound = 10;
  const hashPassword = await bcrypt.hash(password, saltRound);
  return hashPassword
}
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req?.body;
    const phoneNo = phone;
    const existUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existUser) {
      return res
        .json({ message: "User already exist", data: [], success: 0 });
    }
    const hashPassword = await hashPasswordHandler(password);
    await User.create({
      name,
      email,
      password:hashPassword,
      phoneNo,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", data: [], success: 1 });
  } catch (err) {
    console.log("The error is", err);
    return res
      .json({ message: "User not created", data: [], success: 0 });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req?.body;
  } catch (err) {
    console.log("The error is", err);
    return res
      .json({ message: "User can't loggin", data: [], success: 0 });
  }
}
