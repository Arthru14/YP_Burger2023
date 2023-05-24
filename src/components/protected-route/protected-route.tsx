import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth";
import { FC, ReactElement, useEffect, useState } from "react";

interface IProtectedRouteElementProps {
  element: ReactElement;
  anonymous?: boolean;
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
  element,
  anonymous = false,
}): ReactElement<any, any> | null => {
  const { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const init = async () => {
    getUser();
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
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
};

export default ProtectedRouteElement;
