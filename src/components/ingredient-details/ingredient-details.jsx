import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import ServerDataTypes from "../../utils/data-format";

export default function IngredientDetails(props) {
  return (
    <div className={styles.content}>
      <img
        src={props.ingridientDetail.image_large}
        alt={props.ingridientDetail.name}
      />
      <h2 className="text text_type_main-medium">
        {props.ingridientDetail.name}
      </h2>
      <div>
        <div>
          <div className="text text_type_main-default">Калории, ккал</div>
          <div className="text text_type_digits-medium">
            {props.ingridientDetail.calories}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default">Белки, г</div>
          <div className="text text_type_digits-medium">
            {props.ingridientDetail.proteins}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default">Жиры, г</div>
          <div className="text text_type_digits-medium">
            {props.ingridientDetail.fat}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default">Углеводы, г</div>
          <div className="text text_type_digits-medium">
            {props.ingridientDetail.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  dataBurgers: PropTypes.instanceOf(ServerDataTypes.isRequired).isRequired,
};
