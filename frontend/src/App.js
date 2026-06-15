import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login.jsx";
import OTPPage from "./pages/OTP-Page/otp-page.jsx";
import Register from "./pages/Register/register.jsx";
import Home from "./pages/Home/Home.jsx";
import IssueReport from "./pages/IssueReports/IssueReport.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Chat from "./pages/Chat/Chat.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/otp" element={<OTPPage />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="reports" element={<IssueReport />}></Route>
          <Route path="new_ticket" element={<Chat/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
