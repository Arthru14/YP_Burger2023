import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

interface IOrderDetailsProps {
  orderNum: number;
}

const OrderDetails: FC<IOrderDetailsProps> = ({ orderNum }) => {
  return (
    <div className={styles.content}>
      <h1 className="text text_type_digits-large mb-8">
        {orderNum.toString().padStart(6, "0")}
      </h1>
      <div className="text text_type_main-medium mb-15">
        <span className={styles.order_name}>идентификатор заказа</span>
      </div>
      <div className="mb-15">
        <CheckMarkIcon type="primary" />
      </div>
      <div className="text text_type_main-default mb-2">
        <span className={styles.order_text}>Ваш заказ начали готовить</span>
      </div>
      <div className="text text_type_main-default mb-15">
        <span className={styles.order_second_text}>
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </div>
  );
};

export default OrderDetails;
