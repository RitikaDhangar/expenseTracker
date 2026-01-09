import express from "express";
const app = express();
import cors from "cors";
import sequelize from "./config/database.js";
import User from "./models/user.js";
import Expense from "./models/Expenses.js";
import Order from "./models/Order.js";
import UserRouter from "./routes/UserRouter.js";
import ExpenseRouter from "./routes/ExpenseRouter.js";
import OrderRouter from './routes/OrderRouter.js'
import PremiumUserRouter from './routes/PremiumUserRouter.js'
import PuppeteerRouter from './routes/PuppeteerRouter.js'
app.use(express.json());
app.use(cors());
app.use(UserRouter);
app.use(ExpenseRouter);
app.use(OrderRouter);
app.use(PremiumUserRouter);
app.use(PuppeteerRouter);

//One to many relationship between User & Expenses
User.hasMany(Expense, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Expense.belongsTo(User);

// One to many relationship between User and Order
User.hasMany(Order, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Order.belongsTo(User);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(9000, () => {
      console.log("listen to the server");
    });
  } catch (err) {
    console.log("Unable to correct the db", err);
  }
};

startServer();

/*

1.Premium Page->date filter
2. Pagination
3. asc/desc
4. Sum


*/
