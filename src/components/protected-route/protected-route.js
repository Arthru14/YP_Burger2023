import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../../services/cookies";

// export default function ProtectedRoute({ element, anonymous = false }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // const [refreshToken, setRefreshToken] = useState("");
//   // const [accessToken, setAccessToken] = useState("");

//   useLayoutEffect(() => {
//     // Get the user's authentication status from localStorage.
//     const getRefreshToken = localStorage.getItem("refreshToken");
//     // const accessToken = getCookie("accessToken");

//     if (getRefreshToken) {
//       setIsAuthenticated(true);
//       // setRefreshToken(getRefreshToken);
//       // setAccessToken(accessToken);
//     }
//   }, []);

//   const isLoggedIn = useSelector((store) => {
//     return store.userReducer.isLoggedIn;
//   });

//   const isLoginProcess = useSelector(
//     (store) => store.userReducer.isLoginProcess
//   );

//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   if (isLoginProcess) return null;

//   // Если разрешен неавторизованный доступ, а пользователь авторизован...
//   if (anonymous && isAuthenticated) {
//     // ...то отправляем его на предыдущую страницу
//     return <Navigate to={from} />;
//   }

//   // Если требуется авторизация, а пользователь не авторизован...
//   console.log(isAuthenticated || isLoggedIn);
//   if (!anonymous && !(isAuthenticated || isLoggedIn)) {
//     console.log("render protected area");
//     // ...то отправляем его на страницу логин
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   // Если все ок, то рендерим внутреннее содержимое
//   return element;
// }

export default function ProtectedRouteElement({ element, anonymous = false }) {
  const { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) return null;

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && Boolean(auth.user)) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !Boolean(auth.user)) {
    console.log("Debug point");
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

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
