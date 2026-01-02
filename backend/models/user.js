const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
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
      validate: {
        is: {
          args: "/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&]).+$/",
          msg: "Password must contain at least 1 letter, 1 number, and 1 special character",
        },
        len: {
          args: [5, 100],
          msg: "Password must be atleast 6 chracters long",
        },
      },
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
module.exports = User;

//signup
//jwt token
//login
//forgot password
//store user main info as middleware
//Expense Tracker curd
//Extra work
//feb->socket,reddis,
//march->AWS,react
