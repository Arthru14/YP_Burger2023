import { getCookie } from "../services/cookies";

export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const INGRID_ENDPOINT = "ingredients";
export const ORDER_ENDPOINT = "orders";
export const LOGIN_REGISTER_ENDPOINT = "auth/register";
export const LOGIN_ENDPOINT = "auth/login";
export const LOGOUT_ENDPOINT = "auth/logout";
export const NEWTOKEN_ENDPOINT = "auth/token";
export const PASSWORD_NEWSET_ENDPOINT = "password-reset/reset";
export const PASSWORD_RESET_ENDPOINT = "password-reset";
export const GET_PROFILEINFO_ENDPOINT = "auth/user";
export const PATCH_UPDATEPROFILEINFO_ENDPOINT = "auth/user";

// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export default async function requestToServer(url, options) {
  return await fetch(BASE_URL + url, options)
    .then(checkResponse)
    .catch((e) => console.log(e));
}

export async function sendUserRegisterDataToServer(
  nameIn,
  passwordIn,
  emailIn
) {
  return await requestToServer(LOGIN_REGISTER_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailIn,
      password: passwordIn,
      name: nameIn,
    }),
  });
}

export const sendEmailCodeRequest = async (emailIn) => {
  return await requestToServer(PASSWORD_RESET_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailIn,
    }),
  });
};

export const setNewPasswordRequest = async (passwordIn, emailCodeIn) => {
  return await requestToServer(PASSWORD_NEWSET_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: passwordIn,
      token: emailCodeIn,
    }),
  });
};

export const loginRequest = async (emailIn, pwdIn) => {
  return await requestToServer(LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailIn,
      password: pwdIn,
    }),
  });
};

export const logoutRequest = async () => {
  return await requestToServer(LOGOUT_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const changeUserProfileRequest = async (nameIn, passwordIn, emailIn) => {
  return await requestToServer(PATCH_UPDATEPROFILEINFO_ENDPOINT, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      authorization: getCookie("accessToken"),
      email: emailIn,
      password: passwordIn,
      name: nameIn,
    }),
  });
};

export const getUserRequest = async () => {
  return await requestToServer(GET_PROFILEINFO_ENDPOINT, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
  });
};
