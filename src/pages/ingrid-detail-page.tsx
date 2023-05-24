import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { CHANGE_SELECTED_INGREDIENT } from "../services/actions/burger-ingredients.js";

export const IngridDetailPage = () => {
  const { idFromPath } = useParams<string>();
  const dispatch = useDispatch();

  const { itemsOfIngrids, selectedItem } = useSelector(
    (store: any) => store.ingredientReducer
  );

  useLayoutEffect(() => {
    if (itemsOfIngrids.length) {
      dispatch({
        type: CHANGE_SELECTED_INGREDIENT,
        id: idFromPath,
      });
    }
  }, [itemsOfIngrids, idFromPath, dispatch]);

  const existId = (id: string | undefined) => {
    return itemsOfIngrids.some((ingredient: { _id: string; }) => ingredient._id === id);
  };

  return (
    <>
      {itemsOfIngrids.length && !existId(idFromPath) ? (
        <Navigate to="/404" />
      ) : (
        ""
      )}
      {selectedItem._id && itemsOfIngrids.length ? (
        <IngredientDetails />
      ) : (
        <p>{"Загрузка..."}</p>
      )}
    </>
  );
};
