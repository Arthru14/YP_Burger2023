import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { CHANGE_SELECTED_INGREDIENT } from "../services/actions/burger-ingredients.js";
import { getBurgerData } from "../services/actions/app";

export const IngridDetailPage = () => {
  const { idFromPath } = useParams();
  const dispatch = useDispatch();

  const { itemsOfIngrids, selectedItem } = useSelector(
    (store) => store.ingredientReducer
  );

  useLayoutEffect(() => {
    if (itemsOfIngrids.length) {
      dispatch({
        type: CHANGE_SELECTED_INGREDIENT,
        id: idFromPath,
      });
    }
  }, [itemsOfIngrids, idFromPath, dispatch]);

  const existId = (id) => {
    return itemsOfIngrids.some((ingredient) => ingredient._id === id);
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
