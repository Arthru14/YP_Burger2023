import { useLayoutEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

export function LogoutPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useLayoutEffect(() => {
    signOut().then(function () {
      navigate("/login");
    });
  }, []);

  return <>{user ? <p>Выход...</p> : <Navigate to="/login" />}</>;
}
