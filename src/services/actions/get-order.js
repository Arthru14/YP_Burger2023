import { request, ORDER_ENDPOINT } from "../../utils/api";
import { makeOrder, makeOrderFailed, makeOrderSuccess } from "./action-creator";

export function getOrderFromServer(addedIngreds) {
  return function (dispatch) {
    dispatch(makeOrder());

    const data = request(ORDER_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: addedIngreds.map(({ ingridId }) => ingridId),
      }),
    })
      .then((res) => dispatch(makeOrderSuccess(res.order.number)))
      .catch((error) => {
        console.log(error);
        dispatch(makeOrderFailed());
      });
  };
}
