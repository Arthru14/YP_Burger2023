import { Navigate, Route } from "react-router-dom";
import { useAuth } from "./auth";
import { useEffect, useLayoutEffect, useState } from "react";

export const ProtectedRouteElement = ({ element }) => {
  const { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) return null;
  return auth.user ? element : <Navigate to="/login" replace />;
};

export const ProtectedRouteElementNonAuth = ({ element }) => {
  const { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) return null;
  return !auth.user ? element : <Navigate to="/" replace />;
};
