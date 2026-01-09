import { col, fn, Op } from "sequelize";
import Expense from "../models/Expenses.js";

export const getSortingExpense = async (req, res) => {
  const { size, order, page } = req?.body;
  const orderBy = order == "asc" ? "ASC" : "DESC";
  try {
    const offset = (page - 1) * size;
    const { rows, count } = await Expense.findAndCountAll({
      where: {
        userId: req?.user?.id,
      },
      limit: Number(size),
      offset: Number(offset),
      order: [["amount", orderBy]],
    });
    return res.json({
      message: "Expense Pagination",
      data: [
        {
          totalExpenses: count,
          thispagecount: rows?.length,
          rows,
        },
      ],
      success: 1,
    });
  } catch (err) {
    console.log("getSortingExpense err", err);
    return res.json({ message: "User not created", data: [], success: 0 });
  }
};

export const filterExpense = async (req, res) => {
  const { startDate } = req?.body;
  const endDate = new Date();
  try {
    const data = await Expense.findAll({
    //   attributes: ["Category",[fn('MAX',col('amount')),'maxSum']],
        attributes: ['Category',
            [fn('sum', col('amount')), 'totalAmount'],
            // [fn('count', col('id')), 'totalExpenses']
        ],
      where: {
        userId: req?.user.id,
      },
      group: ["Category"],
      order: [["totalAmount", "desc"]],
    });
    return res.json({
      message: "Expense Pagination",
      data,
      success: 1,
    });
  } catch (err) {
    console.log("FilterExpense err", err);
    return res.json({ message: "Something Went Wrong", data: [], success: 0 });
  }
};
