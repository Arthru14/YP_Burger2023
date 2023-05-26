import { FC } from "react";
import styles from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IPriceOutProps } from "../../types/burger-ingredients";

const PriceOut: FC<IPriceOutProps> = ({ price }) => {
  return (
    <div className={`${styles.price_out_main} pt-1 pb-1`}>
      <span className="text text_type_digits-default pr-4">{price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default PriceOut;
