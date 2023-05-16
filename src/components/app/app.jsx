import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import ProtectedRoute from "../protected-route/protected-route";
import { CLEAR_SELECTED_INGREDIENT } from "../../services/actions/burger-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getUserAction } from "../../services/actions/auth-creator";

function App() {
  const dispatch = useDispatch();
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
      <ProvideAuth>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/ingredients/:idFromPath"
            element={<IngridDetailPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/profile/orderhistory"
            element={<ProtectedRoute element={<OrderHistoryPage />} />}
          />
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
              <ProtectedRoute
                anonymous={true}
                element={<ForgotPasswordPage />}
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute
                anonymous={true}
                element={<ResetPasswordPage />}
              />
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
      </ProvideAuth>
    </>
  );
}

export default App;
