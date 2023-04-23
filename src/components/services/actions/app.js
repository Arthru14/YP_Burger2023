import {
  LOAD_INGREDIENTS,
  LOAD_INGREDIENTS_FAILED,
  LOAD_INGREDIENTS_SUCCESS,
} from "./burger-ingredients";
// import {
//   MAKE_ORDER,
//   MAKE_ORDER_FAILED,
//   MAKE_ORDER_SUCCESS,
// } from "./burger-constructor";

const urlBurgerData = "https://norma.nomoreparties.space/api/ingredients";
// const MAKING_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

export const getBurgerData = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_INGREDIENTS });
    const res = await fetch(urlBurgerData);
    if (res.ok) {
      const json = await res.json();
      dispatch({
        type: LOAD_INGREDIENTS_SUCCESS,
        itemsOfIngrids: json.data,
      });
    } else {
      dispatch({ type: LOAD_INGREDIENTS_FAILED });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: LOAD_INGREDIENTS_FAILED });
  }
};

// const sentData = async (url, items, dispatch) => {
// const data = { ingredients: items };

// const res = await fetch(url, {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// });

// if (res.ok) {
//   return await res.json();
// } else {
//   throw new Error(res.status.toString());
// }
// }
