import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth";
import { useEffect, useLayoutEffect, useState } from "react";

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
