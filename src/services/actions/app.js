import {
  LOAD_INGREDIENTS,
  LOAD_INGREDIENTS_FAILED,
  LOAD_INGREDIENTS_SUCCESS,
} from "./burger-ingredients";
import requestToServer, { INGRID_ENDPOINT } from "../../utils/api";

export const getBurgerData = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_INGREDIENTS });

    const data = await requestToServer(INGRID_ENDPOINT);
    if (data.success) {
      dispatch({
        type: LOAD_INGREDIENTS_SUCCESS,
        itemsOfIngrids: data.data,
      });
    } else {
      dispatch({ type: LOAD_INGREDIENTS_FAILED });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: LOAD_INGREDIENTS_FAILED });
  }
};
