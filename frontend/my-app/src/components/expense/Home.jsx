import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { HttpApi } from "../utils";
import toast from "react-hot-toast";
import { STORE_EXPENSE_OBJ } from "../../features/ExpenseSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userName, token } = useSelector((state) => state.UserInfo);
  const { EditExpenseObj } = useSelector((state) => state.expenseInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ExpenseOption, setExpenseOption] = useState({
    amount: '',
    item: '',
    category: ''
  })

  const formSubmitHandler = async () => {
    const res = await HttpApi.post(`createExpense`, {
      amount: ExpenseOption?.amount,
      ItemName: ExpenseOption?.item,
      Category: ExpenseOption?.category,
    });

    if (res?.data?.success) {
      toast.success(res?.data?.message)
    } else {
      toast.error(res?.data?.message)
    }
  }
  const formEditHandler = async () => {
    const res = await HttpApi.post(`editUserExpense`, {
      amount: ExpenseOption?.amount,
      ItemName: ExpenseOption?.item,
      Category: ExpenseOption?.category,
      id:EditExpenseObj?.id
    });
    if (res?.data?.success) {
        setExpenseOption({
      amount: '',
      item: '',
      category: ''
    })
      toast.success(res?.data?.message)
      navigate('/expense')
    } else {
      toast.error(res?.data?.message)
    }
  }
  const EditCancelHandler = () => {
    setExpenseOption({
      amount: '',
      item: '',
      category: ''
    })
    dispatch(STORE_EXPENSE_OBJ({}));
  }
  const buyPremiumHandler = async() => {
    const res = await HttpApi.get('createOrder');
    console.log({ res })
    if (res?.data?.success) {
      const data = res?.data;
      const options = {
        key: data?.key_id,
        order_id: data?.data?.id,
        amount: data.data.amount,
        currency: 'INR',
        name: 'Expense App',
        description: 'Premium Membership',
        handler:async function (response) {
          const resverify = await HttpApi.post('verifyPayment', {
            razorpay_order_id: response?.razorpay_order_id,
            razorpay_payment_id: response?.razorpay_payment_id,
            razorpay_signature: response?.razorpay_signature
          });
          if (resverify?.data?.success) {
            alert("🎉 You are now a Premium User");
          }
        }
      }
      const razorpay = new window.Razorpay(options);
      razorpay.open()
    }
  }
  useEffect(() => {
    if (EditExpenseObj?.id) {
      setExpenseOption({
        amount: Number(EditExpenseObj?.amount),
        item: EditExpenseObj?.ItemName,
        category: EditExpenseObj?.Category,
      })
    }
  }, [EditExpenseObj?.id])
  return (
    <div style={{ padding: '10px' }}>
      <div style={{display:'flex',gap:'16px'}}>
      <p style={{ fontSize: '14px', fontWeight: '500',alignSelf:'center'}}>Hi {userName}</p>
            <Button
              variant="success"
              style={{ width: "150px" }}
              onClick={buyPremiumHandler}
            >
              Buy Premium
        </Button>
        </div><div style={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: 'center' }}>
        <h4>Add Expense</h4>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"
            style={{
              width: "700px",
            }}>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="text" value={ExpenseOption.amount}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setExpenseOption((prev) => {
                    return { ...prev, amount: e.target.value }
                  })
                }
              }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{
            width: "700px",
          }}>
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" value={ExpenseOption.item} onChange={(e) => {
              setExpenseOption((prev) => {
                return { ...prev, item: e.target.value }
              })
            }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{
            width: "700px",
          }}>
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example" value={ExpenseOption.category} onChange={(e) => {
              setExpenseOption((prev) => {
                return { ...prev, category: e.target.value }
              })
            }} >
              <option value={''} disabled>Open this select menu</option>
              <option value="Travel">Travel</option>
              <option value="Essential">Essential</option>
              <option value="Treat">Treat</option>
            </Form.Select>
          </Form.Group>
        </Form>
        {EditExpenseObj?.id ?
          <div style={{ display: 'flex', gap: 3 }}>
            <Button
              variant="primary"
              disabled={!(ExpenseOption?.amount && ExpenseOption?.category && ExpenseOption?.item)}
              style={{ width: "200px" }}
              onClick={formEditHandler}
            >
              Update Expense
            </Button>
            <Button
              variant="secondary"
              style={{ width: "150px" }}
              onClick={EditCancelHandler}
            >
              Cancel
            </Button>
          </div> :
          <Button
            variant="primary"
            disabled={!(ExpenseOption?.amount && ExpenseOption?.category && ExpenseOption?.item)}
            style={{ width: "200px" }}
            onClick={formSubmitHandler}
          >
            Add Expense
          </Button>}
      </div>
    </div>

  );
};
export default Home;
