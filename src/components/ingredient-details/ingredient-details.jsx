import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails(props) {
  return (
    <div className={styles.content}>
      <img src={props.imageLarge} alt={props.name} />
      <h2 className="text text_type_main-medium pt-4">{props.name}</h2>
      <div className={styles.ingrid_info}>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {props.calories}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {props.proteins}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {props.fat}
          </span>
        </div>
        <div>
          <span className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {props.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  imageLarge: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
};
