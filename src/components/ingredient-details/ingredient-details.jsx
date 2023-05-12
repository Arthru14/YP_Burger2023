import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const selectedItem = useSelector(
    (store) => store.ingredientReducer.selectedItem
  );
  console.log(selectedItem);
  useEffect(() => {
    window.history.replaceState(null, null, "/ingredients/" + selectedItem._id);
  }, [selectedItem._id]);

  console.log(selectedItem._id);

  return (
    <div className={styles.content}>
      <img src={selectedItem.image_large} alt={selectedItem.name} />
      <h2 className="text text_type_main-medium pt-4">{selectedItem.name}</h2>
      <div className={styles.ingrid_info}>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {selectedItem.calories}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {selectedItem.proteins}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {selectedItem.fat}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {selectedItem.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
}
