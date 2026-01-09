import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Header from "./components/nav/Header";
import Login from "./components/Auth/Login";
import Home from "./components/expense/Home";
import GlobalLoader from "./components/common/Loader.js";
import ForgotPassword from "./components/password/ForgotPassword";
import ResetPassword from "./components/password/ResetPassword";
import toast, { Toaster } from "react-hot-toast";
import ErrorPage from "./ErrorPage.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Expense from "./components/expense/AllExpense.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STORE_USER_NAME, STORE_USER_TOKEN } from "./features/UserSlice.js";
import { isTokenExpired } from "./components/utils.js";
import PremiumUser from "./components/premium/PremiumUser.js";

function App() {
  const { token } = useSelector((store) => store.UserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (isTokenExpired(token)) {
      navigate("/login");
      dispatch(STORE_USER_NAME(""));
      dispatch(STORE_USER_TOKEN(""));
      toast.error('Session is expired. Please login again')
    }
  }, []);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <GlobalLoader />
      <Routes>
        <Route element={<Header />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/premium" element={<PremiumUser />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/expense" element={<Expense />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
