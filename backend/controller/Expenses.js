import Expense from "../models/Expenses.js";
export const createExpense = async (req, res) => {
  try {
    const { amount, ItemName, Category } = req?.body;
    await Expense.create({
      amount,
      ItemName,
      Category,
      userId: req?.user?.id,
    });
    return res.json({
      message: "Expense added successfully",
      data: [],
      success: 1,
    });
  } catch (err) {
    console.log("createExpense err", err);
    if (err?.name === "SequelizeValidationError") {
      return res.json({
        message: err.errors[0].message,
        success: 0,
      });
    }
    return res.json({ message: "Expense not created", data: [], success: 0 });
  }
};

export const fetchAllExpense = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const allExpenses = await Expense.findAll({
      where: {
        userId,
      },
    });
    return res.json({ message: "All Expense", data: allExpenses, success: 1 });
  } catch (err) {
    console.log("fetchAllExpense err", err);
    if (err?.name === "SequelizeValidationError") {
      return res.json({
        message: err.errors[0].message,
        success: 0,
      });
    }
    return res.json({ message: "Something Went Wrong", data: [], success: 0 });
  }
};

export const editUserExpense = async (req, res) => {
  try {
    const { id, amount, ItemName, Category } = req?.body;
    await Expense.update(
      {
        amount,
        ItemName,
        Category,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      message: "Update Expense successfully",
      data: [],
      success: 1,
    });
  } catch (err) {
    console.log("editUserExpense err", err);
    if (err?.name === "SequelizeValidationError") {
      return res.json({
        message: err.errors[0].message,
        success: 0,
      });
    }
    return res.json({ message: "Something Went Wrong", data: [], success: 0 });
  }
};

export const deleteUserExpense = async (req, res) => {
  try {
    const { id } = req?.body;
    await Expense.destroy({
      where: {
        id,
      },
    });
    return res.json({
      message: "Delete Expense successfully",
      data: [],
      success: 1,
    });
  } catch (err) {
    console.log("deleteUserExpense err", err);
    if (err?.name === "SequelizeValidationError") {
      return res.json({
        message: err.errors[0].message,
        success: 0,
      });
    }
    return res.json({ message: "Something Went Wrong", data: [], success: 0 });
  }
};
