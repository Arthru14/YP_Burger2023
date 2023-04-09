import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerComponentItem(props) {
  return (
    <div className={`${styles.burger_inrid_list_item} pr-4 pl-4`}>
      {props.dragIcon && <DragIcon type="primary" />}
      <ConstructorElement
        type={props.type}
        isLocked={props.isLocked}
        text={props.name}
        price={props.price}
        thumbnail={props.thumbnail}
      />
    </div>
  );
}

function BurgerComponentsList(props) {
  return (
    <div className={`${styles.burger_inrid_list} custom-scroll`}>
      <BurgerComponentItem
        type="top"
        name={props.dataBurgers[0].name}
        price={props.dataBurgers[0].price}
        thumbnail={props.dataBurgers[0].image}
        isLocked
      />
      <BurgerComponentItem
        name={props.dataBurgers[2].name}
        price={props.dataBurgers[2].price}
        thumbnail={props.dataBurgers[2].image}
        dragIcon
      />
      <BurgerComponentItem
        name={props.dataBurgers[5].name}
        price={props.dataBurgers[5].price}
        thumbnail={props.dataBurgers[5].image}
        dragIcon
      />
      <BurgerComponentItem
        name={props.dataBurgers[6].name}
        price={props.dataBurgers[6].price}
        thumbnail={props.dataBurgers[6].image}
        dragIcon
      />
      <BurgerComponentItem
        name={props.dataBurgers[7].name}
        price={props.dataBurgers[7].price}
        thumbnail={props.dataBurgers[7].image}
        dragIcon
      />
      <BurgerComponentItem
        name={props.dataBurgers[11].name}
        price={props.dataBurgers[11].price}
        thumbnail={props.dataBurgers[11].image}
        dragIcon
      />
      <BurgerComponentItem
        name={props.dataBurgers[13].name}
        price={props.dataBurgers[13].price}
        thumbnail={props.dataBurgers[13].image}
        dragIcon
      />
      <BurgerComponentItem
        type="bottom"
        name={props.dataBurgers[1].name}
        price={props.dataBurgers[1].price}
        thumbnail={props.dataBurgers[1].image}
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

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={`${styles.place_order} pt-10 pr-4 pl-4`}>
      {props.price > 0 ? (
        <>
          <span className={`${styles.place_order_price} pr-10`}>
            <span
              className="text text_type_digits-default pr-4"
              onClick={() => handleOpenModal}
            >
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
            <Modal setModalVisible={setModalVisible}>
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

export default BurgerConstructor;
