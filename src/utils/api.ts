import { getCookie } from "../services/cookies";

export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const INGRID_ENDPOINT = "ingredients";
export const ORDER_ENDPOINT = "orders";
export const LOGIN_REGISTER_ENDPOINT = "auth/register";
export const REFRESH_TOKEN_ENDPOINT = "auth/token";
export const LOGIN_ENDPOINT = "auth/login";
export const LOGOUT_ENDPOINT = "auth/logout";
export const NEWTOKEN_ENDPOINT = "auth/token";
export const PASSWORD_NEWSET_ENDPOINT = "password-reset/reset";
export const PASSWORD_RESET_ENDPOINT = "password-reset";
export const GET_PROFILEINFO_ENDPOINT = "auth/user";
export const PATCH_UPDATEPROFILEINFO_ENDPOINT = "auth/user";

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

// функция проверки на `success`
const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = async (endpoint: RequestInfo, options?: RequestInit) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return await fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export function sendUserRegisterDataToServer(
  nameIn: string,
  passwordIn: string,
  emailIn: string
) {
  return request(LOGIN_REGISTER_ENDPOINT, {
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

export function sendEmailCodeRequest(emailIn: string) {
  return request(PASSWORD_RESET_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailIn,
    }),
  });
}

export function setNewPasswordRequest(passwordIn: string, emailCodeIn: string) {
  return request(PASSWORD_NEWSET_ENDPOINT, {
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
}

export function loginRequest(emailIn: string, pwdIn: string) {
  return request(LOGIN_ENDPOINT, {
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
}

export function refreshRequest() {
  return request(REFRESH_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
}

export function logoutRequest() {
  return request(LOGOUT_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
}

export function changeUserProfileRequest(
  nameIn: string,
  passwordIn: string,
  emailIn: string
) {
  return request(PATCH_UPDATEPROFILEINFO_ENDPOINT, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      authorization: getCookie("accessToken"),
      email: emailIn,
      password: passwordIn,
      name: nameIn,
    }),
  });
}

export function getUserRequest() {
  return request(GET_PROFILEINFO_ENDPOINT, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
  });
}
