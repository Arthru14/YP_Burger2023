import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ element, anonymous = false }) {
  const isLoggedIn = useSelector((store) => store.userReducer.isLoggedIn);
  const isLoginProcess = useSelector(
    (store) => store.userReducer.isLoginProcess
  );

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (isLoginProcess) return null;

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

// export const ProtectedRouteElement = ({ element }) => {
//   const { getUser, ...auth } = useAuth();
//   const [isUserLoaded, setUserLoaded] = useState(false);
//   const location = useLocation();

//   const init = async () => {
//     await getUser();
//     setUserLoaded(true);
//   };

//   useEffect(() => {
//     init();
//   }, []);

//   if (!isUserLoaded) return null;

//   return auth.user ? (
//     element
//   ) : (
//     <Navigate to="/login" state={{ from: location }} />
//   );
// };

// export const ProtectedRouteElementNonAuth = ({ element }) => {
//   const { getUser, ...auth } = useAuth();
//   const [isUserLoaded, setUserLoaded] = useState(false);
//   const nvaigate = useNavigate();

//   const init = async () => {
//     await getUser();
//     setUserLoaded(true);
//   };

//   useEffect(() => {
//     init();
//   }, []);

//   if (!isUserLoaded) return null;
//   return !auth.user ? element : nvaigate(-1, { replace: true });
// };
