import { useLayoutEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

export function LogoutPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useLayoutEffect(() => {
    signOut().then(function () {});
  }, []);

  return <>{user ? <p>Выход...</p> : <Navigate to="/login" />}</>;

  // useLayoutEffect(() => {
  //   signOut().then(function () {
  //     navigate("/login");
  //   });
  // }, []);
  // console.log("logout");

  // return <>{user ? <p>Выход...</p> : <Navigate to="/login" />}</>;
}
