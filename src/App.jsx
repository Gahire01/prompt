import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProductCreate from "./pages/ProductCreate.jsx";
import WarehouseCreate from "./pages/WarehouseCreate.jsx";
import TransactionList from "./pages/TransactionList.jsx";
import TransactionCreate from "./pages/TransactionCreate.jsx";
import TransactionEdit from "./pages/TransactionEdit.jsx";
import Report from "./pages/Report.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/new" element={<ProductCreate />} />
        <Route path="/warehouse/new" element={<WarehouseCreate />} />
        <Route path="/transaction" element={<TransactionList />} />
        <Route path="/transaction/new" element={<TransactionCreate />} />
        <Route path="/transaction/:id/edit" element={<TransactionEdit />} />
        <Route path="/report" element={<Report />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
