import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { HttpApi } from "../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { STORE_EXPENSE_OBJ } from "../../features/ExpenseSlice";

const AllExpense = () => {
  const [allExpenses, setAllExpenses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllExpensesHandler = async () => {
    const res = await HttpApi.get(`fetchAllExpense`);
    if (res?.data?.success) {
      setAllExpenses(res?.data?.data);
    }
  };
  const EditItemHandler = (item) => {
    dispatch(STORE_EXPENSE_OBJ(item));
    navigate("/");
  };
  const deleteItemHandler = async (item) => {
    console.log({ item });
    const updateExpense = allExpenses.filter((d) => {
      return d.id != item.id;
    });
    const res = await HttpApi.post(`deleteUserExpense`, {
      id: item?.id,
    });
    if (res.data.success) {
      setAllExpenses(updateExpense);
    }
  };
  useEffect(() => {
    getAllExpensesHandler();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>
        All Expenses are Below
      </h3>
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ width: "700px", marginTop: "50px" }}
      >
        <thead>
          <tr>
            <th>Amount</th>
            <th>Item Name</th>
            <th>Category</th>
            <th style={{ textAlign: "center" }}>Edit</th>
            <th style={{ textAlign: "center" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allExpenses.map((item) => (
            <tr key={item?.id}>
              <td>{item?.amount}</td>
              <td>{item?.ItemName}</td>
              <td>{item?.Category}</td>
              <td
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => EditItemHandler(item)}
              >
                <i class="bi bi-pencil"></i>
              </td>
              <td
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => deleteItemHandler(item)}
              >
                <i class="bi bi-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default AllExpense;
