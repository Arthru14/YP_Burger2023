import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails({ ingridDetail }) {
  return (
    <div className={styles.content}>
      <img src={ingridDetail.image_large} alt={ingridDetail.name} />
      <h2 className="text text_type_main-medium pt-4">{ingridDetail.name}</h2>
      <div className={styles.ingrid_info}>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingridDetail.calories}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingridDetail.proteins}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingridDetail.fat}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingridDetail.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingridDetail: PropTypes.shape({
    image_large: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  }).isRequired,
};
