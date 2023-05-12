import {
  LOGIN,
  LOGOUT,
  REGISTER,
  RESET_PASSWORD,
  SAVE_PASSWORD,
  UPDATE_PROFILE,
  LOAD_PROFILE_FAILED,
} from "./auth";
import {
  //   changeUserRequest,
  //   getUserRequest,
  //   loginRequest,
  //   logoutRequest,
  //   registerRequest,
  //   resetPasswordRequest,
  //   sendRecoveryCodeRequest,
  sendUserRegisterDataToServer,
  sendEmailCodeRequest,
  setNewPasswordRequest,
  loginRequest,
  logoutRequest,
  changeUserProfileRequest,
} from "../../utils/api";
import { deleteCookie, setCookie } from "../cookies";

const handleErrors = async (func) => {
  try {
    await func();
  } catch (ex) {
    console.log(ex.message);
  }
};

const registerNewUserInternal = async (name, password, email, dispatch) => {
  const data = await sendUserRegisterDataToServer(name, password, email);
  dispatch({ type: REGISTER, data });
};

export const registerNewUser = (name, password, email) => async (dispatch) => {
  handleErrors(() => registerNewUserInternal(name, password, email, dispatch));
};

const sendEmailCodeCreator = async (email, dispatch) => {
  const result = await sendEmailCodeRequest(email);
  if (result) dispatch({ type: RESET_PASSWORD });
};

export const sendEmailCode = (email) => async (dispatch) => {
  handleErrors(() => sendEmailCodeCreator(email, dispatch));
};

const saveNewPasswordCreator = async (password, emailCode, dispatch) => {
  const result = await setNewPasswordRequest(password, emailCode);
  if (result) dispatch({ type: SAVE_PASSWORD });
};

export const saveNewPassword = (password, emailCode) => async (dispatch) => {
  handleErrors(() => saveNewPasswordCreator(password, emailCode, dispatch));
};

const loginInternal = async (email, password, dispatch) => {
  const data = await loginRequest(email, password);
  setCookie("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  dispatch({ type: LOGIN, data });
};

export const login = (email, password) => async (dispatch) => {
  handleErrors(() => loginInternal(email, password, dispatch));
};

const logoutInternal = async (dispatch) => {
  await logoutRequest();

  deleteCookie("accessToken");
  localStorage.removeItem("refreshToken");
  dispatch({ type: LOGOUT });
};

export const logout = () => async (dispatch) => {
  handleErrors(() => logoutInternal(dispatch));
};

const updateUserProfileInternal = async (name, password, email, dispatch) => {
  const data = await changeUserProfileRequest(name, password, email);
  dispatch({ type: UPDATE_PROFILE, data });
};

export const updateUserProfile =
  (name, password, email) => async (dispatch) => {
    handleErrors(() =>
      updateUserProfileInternal(name, password, email, dispatch)
    );
  };

// const resetPasswordInternal2 = async (password, token, dispatch) => {
//   await resetPasswordRequest(password, token);
//   dispatch({ type: SAVE_PASSWORD });
// };

// export const resetPassword = (email) => async (dispatch) => {
//   handleErrors(() => resetPasswordInternal(email, dispatch));
// };

// export const savePassword = (password, token) => async (dispatch) => {
//   handleErrors(() => resetPasswordInternal2(password, token, dispatch));
// };

// const getUser = async (dispatch) => {
//   const data = await getUserRequest();
//   dispatch({ type: UPDATE_PROFILE, ...data });
// };

// export const getProfile = () => async (dispatch) => {
//   try {
//     await getUser(dispatch);
//   } catch (ex) {
//     console.log("profile failed", ex.message);
//     dispatch({ type: LOAD_PROFILE_FAILED });
//   }
// };
