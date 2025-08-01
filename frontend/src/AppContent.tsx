import React, { useContext, type JSX } from "react";
import { Routes, Route, Navigate } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductFormPage from "./pages/ProductFormPage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContent: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route
      path="/manage/*"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <Routes>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/new" element={<ProductFormPage />} />
              <Route path="products/:id" element={<ProductFormPage />} />
              <Route path="report" element={<ReportPage />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppContent;
