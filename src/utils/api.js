export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const INGRID_ENDPOINT = "ingredients";
export const ORDER_ENDPOINT = "orders";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export default async function requestToServer(url, options) {
  return await fetch(BASE_URL + url, options).then(checkResponse);
}
