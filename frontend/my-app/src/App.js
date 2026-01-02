import { Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Header from "./components/nav/Header";
import Login from "./components/Auth/Login";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
