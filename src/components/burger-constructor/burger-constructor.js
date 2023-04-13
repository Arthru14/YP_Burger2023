import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ServerDataTypes from "../../utils/data-format";
import { IngridContext } from "../services/ingrid-context";
import { TotalPriceContext } from "../services/total-price";

const bunId = "60d3b41abdacab0026a733c7";
const idItemsOfBurger = [
  "60d3b41abdacab0026a733c8",
  "60d3b41abdacab0026a733c9",
  "60d3b41abdacab0026a733ca",
  "60d3b41abdacab0026a733cc",
  "60d3b41abdacab0026a733cd",
];

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
  // console.log(props.dataBurgers.find((item) => item._id === bunId).name);
  return (
    <div className={styles.burger_inrid_list}>
      <BurgerComponentItem
        type="top"
        name={props.dataBurgers.find((item) => item._id === bunId).name}
        price={props.dataBurgers.find((item) => item._id === bunId).price}
        thumbnail={props.dataBurgers.find((item) => item._id === bunId).image}
        isLocked
      />
      <div className={styles.burger_inrid_inner_list}>
        {idItemsOfBurger.map((ingridItem) => {
          return (
            <BurgerComponentItem
              name={
                props.dataBurgers.find((item) => item._id === ingridItem).name
              }
              price={
                props.dataBurgers.find((item) => item._id === ingridItem).price
              }
              thumbnail={
                props.dataBurgers.find((item) => item._id === ingridItem).image
              }
              key={
                props.dataBurgers.find((item) => item._id === ingridItem)._id
              }
              dragIcon
            />
          );
        })}
      </div>
      <BurgerComponentItem
        type="bottom"
        name={props.dataBurgers.find((item) => item._id === bunId).name}
        price={props.dataBurgers.find((item) => item._id === bunId).price}
        thumbnail={props.dataBurgers.find((item) => item._id === bunId).image}
        isLocked
      />
    </div>
  );
}

function PlaceOrder(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
  const burgerData = useContext(IngridContext);

  useEffect(() => {
    let sumPrice = 0;
    idItemsOfBurger.forEach((item) => {
      sumPrice += burgerData.find(
        (ItemOfBurgerData) => ItemOfBurgerData._id === item
      ).price;
    });
    sumPrice +=
      2 *
      burgerData.find((ItemOfBurgerData) => ItemOfBurgerData._id === bunId)
        .price;
    setTotalPrice(sumPrice);
  }, [burgerData, setTotalPrice]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <div className={`${styles.place_order} pt-10 pr-4 pl-4`}>
      {totalPrice > 0 ? (
        <>
          <span className={`${styles.place_order_price} pr-10`}>
            <span className="text text_type_digits-default pr-4">
              {totalPrice}
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

function BurgerConstructor() {
  const burgerData = useContext(IngridContext);

  return (
    <section className={`${styles.wrapper} pt-25`}>
      <BurgerComponentsList dataBurgers={burgerData} />
      <PlaceOrder price="4255" />
    </section>
  );
}

BurgerConstructor.propTypes = {
  burgerData: PropTypes.arrayOf(ServerDataTypes.isRequired),
};
export default BurgerConstructor;
