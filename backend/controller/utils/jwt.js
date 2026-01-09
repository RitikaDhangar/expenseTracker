import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
export const generateToken = (userId,isPremiumUser) => {
  return jwt.sign({ id: userId,isPremiumUser }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const hashPasswordHandler = async (password) => {
  const saltRound = 10;
  const hashPassword = await bcrypt.hash(password, saltRound);
  return hashPassword;
};
