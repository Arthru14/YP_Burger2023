import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import { getBurgerData } from "../../services/actions/app";
import {
  MainPage,
  NotFound404,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  LogoutPage,
  OrderHistoryPage,
  IngridDetailPage,
} from "../../pages";
import ProtectedRoute from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getUserAction } from "../../services/actions/auth-creator";
import { useAppDispatch } from "../..";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getBurgerData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  const background = location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/ingredients/:idFromPath" element={<IngridDetailPage />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route
          path="/profile/orderhistory"
          element={<ProtectedRoute element={<OrderHistoryPage />} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/logout"
          element={<ProtectedRoute element={<LogoutPage />} />}
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute anonymous={true} element={<RegisterPage />} />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute anonymous={true} element={<ForgotPasswordPage />} />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute anonymous={true} element={<ResetPasswordPage />} />
          }
        />
        <Route path="*" element={<NotFound404 />} />
        {background && (
          <Route
            path="/ingredients/:idFromPath"
            element={<IngredientDetails />}
          />
        )}
      </Routes>
    </>
  );
}

export default App;
