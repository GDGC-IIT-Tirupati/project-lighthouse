import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login.jsx";
import OTPPage from "./pages/OTP-Page/otp-page.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/otp" element={<OTPPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
