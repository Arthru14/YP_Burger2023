import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ServerDataTypes from "../../utils/data-format";

function BurgerComponentItem(props) {
  let ingridName = props.name;
  if (props.type === "top") {
    ingridName += " (верх)";
  } else if (props.type === "bottom") {
    ingridName += " (низ)";
  }

  return (
    <div className={`${styles.burger_inrid_list_item} pr-4 pl-4`}>
      {props.dragIcon && <DragIcon type="primary" />}
      <ConstructorElement
        type={props.type}
        isLocked={props.isLocked}
        text={ingridName}
        price={props.price}
        thumbnail={props.thumbnail}
      />
    </div>
  );
}

function BurgerComponentsList(props) {
  return (
    <div className={styles.burger_inrid_list}>
      <BurgerComponentItem
        type="top"
        name={props.dataBurgers[0].name}
        price={props.dataBurgers[0].price}
        thumbnail={props.dataBurgers[0].image}
        isLocked
      />
      <div className={styles.burger_inrid_inner_list}>
        {props.dataBurgers.map((ingridItem) => {
          return ingridItem.type !== "bun" ? (
            <BurgerComponentItem
              name={ingridItem.name}
              price={ingridItem.price}
              thumbnail={ingridItem.image}
              key={ingridItem._id}
              dragIcon
            />
          ) : null;
        })}
      </div>
      <BurgerComponentItem
        type="bottom"
        name={props.dataBurgers[0].name}
        price={props.dataBurgers[0].price}
        thumbnail={props.dataBurgers[0].image}
        isLocked
      />
      {/* <div className={`${styles.burger_inrid_list_item} pr-4 pl-4`}>
        <DragIcon type="primary" />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </div> */}
    </div>
  );
}

function PlaceOrder(props) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <div className={`${styles.place_order} pt-10 pr-4 pl-4`}>
      {props.price > 0 ? (
        <>
          <span className={`${styles.place_order_price} pr-10`}>
            <span className="text text_type_digits-default pr-4">
              {props.price}
            </span>
            <CurrencyIcon type="primary" className="pr-10" />
          </span>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => handleOpenModal()}
          >
            Оформить заказ
          </Button>
          {modalVisible && (
            <Modal onClose={() => setModalVisible(false)}>
              <OrderDetails orderNum="034536" />
            </Modal>
          )}
        </>
      ) : (
        <Button htmlType="button" type="primary" size="medium">
          Собери свой бургер!
        </Button>
      )}
    </div>
  );
}

function BurgerConstructor(props) {
  return (
    <section className={`${styles.wrapper} pt-25`}>
      <BurgerComponentsList dataBurgers={props.dataBurgers} />
      <PlaceOrder price="4255" />
    </section>
  );
}

BurgerConstructor.propTypes = {
  dataBurgers: PropTypes.arrayOf(ServerDataTypes.isRequired).isRequired,
};
export default BurgerConstructor;
