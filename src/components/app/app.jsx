import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { ProvideAuth, useAuth } from "../../services/auth";
import {
  ProtectedRouteElement,
  ProtectedRouteElementNonAuth,
} from "../../services/protected-route";

function App() {
  const dispatch = useDispatch();
  // const { getUser, ...auth } = useAuth();

  // const init = async () => {
  //   await getUser();
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  useEffect(() => {
    dispatch(getBurgerData());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <ProvideAuth>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/ingredients/:idFromPath"
            element={<IngridDetailPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          <Route
            path="/profile/orderhistory"
            element={<ProtectedRouteElement element={<OrderHistoryPage />} />}
          />
          <Route
            path="/logout"
            element={<ProtectedRouteElement element={<LogoutPage />} />}
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElementNonAuth element={<RegisterPage />} />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElementNonAuth element={<ForgotPasswordPage />} />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElementNonAuth element={<ResetPasswordPage />} />
            }
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </ProvideAuth>
    </>
  );
}

export default App;
