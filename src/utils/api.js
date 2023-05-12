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
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export default async function requestToServer(url, options) {
  return await fetch(BASE_URL + url, options).then(checkResponse);
}

export async function sendUserRegisterDataToServer(
  nameIn,
  passwordIn,
  emailIn
) {
  try {
    const result = await requestToServer(LOGIN_REGISTER_ENDPOINT, {
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
    if (result.success) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

export const sendEmailCodeRequest = async (emailIn) => {
  try {
    const result = await requestToServer(PASSWORD_RESET_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailIn,
      }),
    });
    if (result.success) {
      return result.success;
    }
  } catch (error) {
    console.log(error);
  }
};

export const setNewPasswordRequest = async (passwordIn, emailCodeIn) => {
  try {
    const result = await requestToServer(PASSWORD_NEWSET_ENDPOINT, {
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
    if (result.success) {
      return result.success;
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginRequest = async (emailIn, pwdIn) => {
  try {
    const result = await requestToServer(LOGIN_ENDPOINT, {
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
    if (result.success) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const logoutRequest = async () => {
  try {
    const result = await requestToServer(LOGOUT_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
    if (result.success) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeUserProfileRequest = async (nameIn, passwordIn, emailIn) => {
  try {
    const result = await requestToServer(PATCH_UPDATEPROFILEINFO_ENDPOINT, {
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
    if (result.success) {
      return result;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const getUserRequest = async () => {
  try {
    const result = await requestToServer(GET_PROFILEINFO_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: getCookie("accessToken"),
      },
    });
    if (result.success) {
      return result;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
