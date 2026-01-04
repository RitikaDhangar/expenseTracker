import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [3, 225],
        msg: "Name must be between 3 to 225 characters long",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email must be valid",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 12],
          msg: "Contact must be between 8 to 12 digits long",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);
export default User;

//signup
//jwt token
//login
//forgot password
//store user main info as middleware
//Expense Tracker curd
//Extra work
//feb->socket,reddis,
//march->AWS,react
