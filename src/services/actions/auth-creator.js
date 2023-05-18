import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN,
  LOGOUT,
  REGISTER,
  REGISTER_PROCESS,
  RESET_PASSWORD,
  SAVE_PASSWORD,
  UPDATE_PROFILE,
} from "./auth";
import {
  sendUserRegisterDataToServer,
  sendEmailCodeRequest,
  setNewPasswordRequest,
  loginRequest,
  logoutRequest,
  changeUserProfileRequest,
  getUserRequest,
} from "../../utils/api";
import { deleteCookie, getCookie, setCookie } from "../cookies";

const handleErrors = async (func) => {
  try {
    await func();
  } catch (ex) {
    console.log(ex.message);
  }
};

const registerNewUserInternal = async (name, password, email, dispatch) => {
  try {
    dispatch({ type: REGISTER_PROCESS });
    const data = await sendUserRegisterDataToServer(name, password, email);
    if (data.success) {
      dispatch({ type: REGISTER, data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerNewUser = (name, password, email) => async (dispatch) => {
  handleErrors(() => registerNewUserInternal(name, password, email, dispatch));
};

const sendEmailCodeCreator = async (email, dispatch) => {
  try {
    const data = await sendEmailCodeRequest(email);
    if (data.success) {
      dispatch({ type: RESET_PASSWORD });
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailCode = (email) => async (dispatch) => {
  handleErrors(() => sendEmailCodeCreator(email, dispatch));
};

const saveNewPasswordCreator = async (password, emailCode, dispatch) => {
  try {
    const data = await setNewPasswordRequest(password, emailCode);
    if (data.success) {
      dispatch({ type: SAVE_PASSWORD });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveNewPassword = (password, emailCode) => async (dispatch) => {
  handleErrors(() => saveNewPasswordCreator(password, emailCode, dispatch));
};

const loginInternal = async (email, password, dispatch) => {
  try {
    const data = await loginRequest(email, password);
    if (data.success) {
      setCookie("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      console.log(data);
      dispatch({ type: LOGIN, data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = (email, password) => async (dispatch) => {
  handleErrors(() => loginInternal(email, password, dispatch));
};

export function loginAction(email, password) {
  return function (dispatch) {
    const data = loginRequest(email, password).then((res) => {
      if (res && res.success) {
        dispatch({ type: LOGIN, res });
        setCookie("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      }
    });
    // console.log(data);
    // if (data.success) {
    //   setCookie("accessToken", data.accessToken);
    //   localStorage.setItem("refreshToken", data.refreshToken);
    //   console.log(data);
    //   dispatch({ type: LOGIN, data });
    // }
  };
}
export const logoutAction = () => {
  return function (dispatch) {
    logoutRequest()
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({ type: LOGOUT });
          return true;
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
};

export const getUserAction = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            res,
          });
          return res;
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });

    // try {
    //   const res = await getUserRequest();
    //   console.log(res);
    //   if (res && res.success) {
    //     // setCookie("accessToken", res.accessToken);
    //     // localStorage.setItem("refreshToken", res.refreshToken);
    //     dispatch({
    //       type: GET_USER_SUCCESS,
    //       res,
    //     });
    //   }
    // } catch (err) {
    //   console.error("Error: ", err);
    // }
  };
};

const logoutInternal = async (dispatch) => {
  try {
    const data = await logoutRequest();
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  handleErrors(() => logoutInternal(dispatch));
};

const updateUserProfileInternal = async (name, password, email, dispatch) => {
  try {
    const data = await changeUserProfileRequest(name, password, email);
    if (data.success) {
      dispatch({ type: UPDATE_PROFILE, data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile =
  (name, password, email) => async (dispatch) => {
    handleErrors(() =>
      updateUserProfileInternal(name, password, email, dispatch)
    );
  };

export const registrationProcess = () => ({
  type: REGISTER_PROCESS,
});
