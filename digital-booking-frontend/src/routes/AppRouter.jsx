import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import DetailPage from "../pages/Detail";
import BookingPage from "../pages/Booking";
import CategoryPage from "../pages/Category";
import RegisterPage from "../pages/Register";
import AdminPage, {
  AdminCategories,
  AdminProducts,
  AdminUsers,
  AdminBrands,
  AdminBranches,
} from "../pages/Admin";
import LoginPage from "../pages/Login";
import { useApp } from "../context/AppContext";

const AppRouter = () => {
  const { user } = useApp();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      {user && user?.rol?.name.toLowerCase() === "user" ? (
        <Route path="/booking/:id" element={<BookingPage />} />
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}
      <Route path="/categories/:category" element={<CategoryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {user && user?.rol?.name.toLowerCase() === "admin" ? (
        <Route path="/admin/" element={<AdminPage />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="brands" element={<AdminBrands />} />
          <Route path="branches" element={<AdminBranches />} />
        </Route>
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
