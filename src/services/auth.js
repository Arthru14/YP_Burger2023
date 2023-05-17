import { useContext, useState, createContext, useEffect } from "react";
import { getUserRequest, loginRequest, logoutRequest } from "../utils/api";
import {
  getUserAction,
  login,
  loginAction,
  logout,
  logoutAction,
} from "./actions/auth-creator";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie, setCookie } from "./cookies";
import { LOGIN_PROCESS } from "./actions/auth";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  // const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  // const { name, email } = useSelector((store) => store.userReducer.currentUser);

  // const getUser = () => {
  //   // dispatch(getUserAction());
  //   setUser({ name: name, email: email });
  // };

  const getUser = async () => {
    try {
      const data = await getUserRequest();
      setUser({ name: data.user.name, email: data.user.email });
    } catch (ex) {
      console.log(ex.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      // dispatch({ type: LOGIN_PROCESS });
      // dispatch(loginAction(email, password));
      const data = await loginRequest(email, password);
      setCookie("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (ex) {
      console.log(ex.message);
    }
  };

  // const signIn = async (email, password) => {
  //   try {
  //     dispatch(login(email, password));
  //   } catch (ex) {
  //     console.log(ex.message);
  //   }
  // };

  const signOut = async () => {
    try {
      // dispatch(logoutAction());
      await logoutRequest();
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } catch (ex) {
      console.log(ex.message);
    }
  };

  // const signOut = async () => {
  //   try {
  //     dispatch(logout());
  //     setUser(null);
  //   } catch (ex) {
  //     console.log(ex.message);
  //   }
  // };

  return {
    user,
    getUser,
    signIn,
    signOut,
  };
}
