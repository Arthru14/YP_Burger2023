import { useContext, useState, createContext, ReactNode, FC } from "react";
import { getUserRequest, loginRequest, logoutRequest } from "../utils/api";
import { deleteCookie, setCookie } from "./cookies";

interface IProvideAuth {
  children: ReactNode;
}

interface IUser {
  name: string;
  email: string;
}

interface IGetUserFunc {
  (): void;
}

interface ISignInFunc {
  (email: string, password: string): any;
}

interface ISignOutFunc {
  (): any;
}

interface IAuthContext {
  user: IUser | null;
  getUser: IGetUserFunc;
  signIn: ISignInFunc;
  signOut: ISignOutFunc;
}

const defAuthContextProps: IAuthContext = {
  user: null,
  getUser: async () => {},
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
};

const AuthContext = createContext<IAuthContext>(defAuthContextProps);

export const ProvideAuth: FC<IProvideAuth> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState<IUser | null>(null);

  const getUser = async () => {
    try {
      const data = await getUserRequest();
      setUser({ name: data.user.name, email: data.user.email });
    } catch (ex: unknown) {
      console.log((ex as Error).message);
    }
  };

  const signIn = async (email: string, password: string) => {
    // await loginRequest(email, password)
    // .then((res) => {
    //   setCookie("accessToken", res.accessToken);
    //   localStorage.setItem("refreshToken", res.refreshToken);
    // })
    // .catch ((ex: unknown) => console.log((ex as Error).message));
    try {
      const data = await loginRequest(email, password);
      setCookie("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (ex: unknown) {
      console.log((ex as Error).message);
    }
  };

  const signOut = async () => {
    try {
      await logoutRequest();
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } catch (ex: unknown) {
      console.log((ex as Error).message);
    }
  };

  return {
    user,
    getUser,
    signIn,
    signOut,
  };
}
