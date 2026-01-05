import { Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Header from "./components/nav/Header";
import Login from "./components/Auth/Login";
import Home from "./components/expense/Home";
import ForgotPassword from './components/password/ForgotPassword'
import ResetPassword from "./components/password/ResetPassword";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
