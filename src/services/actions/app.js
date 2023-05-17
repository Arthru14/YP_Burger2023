import {
  LOAD_INGREDIENTS,
  LOAD_INGREDIENTS_FAILED,
  LOAD_INGREDIENTS_SUCCESS,
} from "./burger-ingredients";
import { request, INGRID_ENDPOINT } from "../../utils/api";

export const getBurgerData = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_INGREDIENTS });

    const data = request(INGRID_ENDPOINT)
      .then((res) =>
        dispatch({
          type: LOAD_INGREDIENTS_SUCCESS,
          itemsOfIngrids: res.data,
        })
      )
      .catch((err) => {
        console.log(err);
        dispatch({ type: LOAD_INGREDIENTS_FAILED });
      });
  } catch (e) {
    console.log(e);
    dispatch({ type: LOAD_INGREDIENTS_FAILED });
  }
};
