import { useContext, useState, createContext } from "react";
import { getUserRequest } from "../utils/api";
// import { deleteCookie, setCookie } from "./cookies";
import { login, logout } from "./actions/auth-creator";
import { useDispatch } from "react-redux";

// const fakeAuth = {
//   isAuthenticated: false,
//   signIn(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signOut(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   },
// };

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const data = await getUserRequest();
      if (data) setUser({ name: data.user.name, email: data.user.email });
    } catch (ex) {
      console.log(ex.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      // const data = await loginRequest(email, password);
      // if (data) {
      //   setCookie("accessToken", data.accessToken);
      //   localStorage.setItem("refreshToken", data.refreshToken);
      // }
      dispatch(login(email, password));
    } catch (ex) {
      console.log(ex.message);
    }
    // return true;
  };

  const signOut = async () => {
    try {
      // await logoutRequest();
      // deleteCookie("accessToken");
      // localStorage.removeItem("refreshToken");
      dispatch(logout());
      setUser(null);
    } catch (ex) {
      console.log(ex.message);
    }
  };

  return {
    user,
    getUser,
    signIn,
    signOut,
  };
}
