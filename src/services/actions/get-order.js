import requestToServer, { ORDER_ENDPOINT } from "../../utils/api";
import { makeOrder, makeOrderFailed, makeOrderSuccess } from "./action-creator";

export function getOrderFromServer(addedIngreds) {
  return function (dispatch) {
    dispatch(makeOrder());

    const data = requestToServer(ORDER_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: addedIngreds.map(({ ingridId }) => ingridId),
      }),
    })
      .then((result) => {
        if (result.success) {
          dispatch(makeOrderSuccess(result.order.number));
          console.log(result.order.number);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(makeOrderFailed());
      });
  };
}
