import { useContext, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ServerDataTypes from "../../utils/data-format";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  MAKE_ORDER,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_SUCCESS,
  REMOVE_INGREDIENT,
  SET_TOTAL_PRICE,
} from "../services/actions/burger-constructor";
import NoItem from "../../images/no-item.png";
import { useDrop } from "react-dnd";

const orderUrl = "https://norma.nomoreparties.space/api/orders";

function BurgerComponentItem(props) {
  const dispatch = useDispatch();
  let ingridName = props.name;
  if (props.type === "top") {
    ingridName += " (верх)";
  } else if (props.type === "bottom") {
    ingridName += " (низ)";
  }

  const onRemoveItemHandle = () => {
    dispatch({ id: props.id, type: REMOVE_INGREDIENT, price: props.price });
  };

  return (
    <div className={`${styles.burger_inrid_list_item} pr-4 pl-4`}>
      {props.dragIcon && <DragIcon type="primary" />}
      <ConstructorElement
        type={props.type}
        isLocked={props.isLocked}
        text={ingridName}
        price={props.price}
        thumbnail={props.thumbnail}
        handleClose={onRemoveItemHandle}
      />
    </div>
  );
}

function BurgerComponentsList() {
  const dispatch = useDispatch();
  const burgerData = useSelector(
    (store) => store.ingredientReducer.itemsOfIngrids
  );
  const { isBunAdded } = useSelector((store) => store.constructorsReducer);
  const { addedIngreds } = useSelector((store) => store.constructorsReducer);

  const onDropHandler = (item) => {
    if (item.isBun) {
      dispatch({
        id: item.id,
        type: ADD_BUN,
        price: item.price,
        priceBefore: isBunAdded
          ? burgerData.find((item) => item._id === addedIngreds[0]).price
          : 0,
      });
    } else {
      dispatch({ id: item.id, type: ADD_INGREDIENT, price: item.price });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "burger",
    drop(itemId) {
      onDropHandler(itemId);
    },
  });

  return (
    <div className={styles.burger_inrid_list} ref={dropTarget}>
      <BurgerComponentItem
        type="top"
        name={
          isBunAdded
            ? burgerData.find((item) => item._id === addedIngreds[0]).name
            : "Выберите булку"
        }
        price={
          isBunAdded
            ? burgerData.find((item) => item._id === addedIngreds[0]).price
            : ""
        }
        thumbnail={
          isBunAdded
            ? burgerData.find((item) => item._id === addedIngreds[0]).image
            : NoItem
        }
        isLocked={isBunAdded}
      />
      <div className={styles.burger_inrid_inner_list}>
        {addedIngreds.map((ingridItem, index) => {
          if (isBunAdded && (index === 0 || index === addedIngreds.length - 1))
            return "";
          return (
            index && (
              <BurgerComponentItem
                name={burgerData.find((item) => item._id === ingridItem).name}
                price={burgerData.find((item) => item._id === ingridItem).price}
                thumbnail={
                  burgerData.find((item) => item._id === ingridItem).image
                }
                key={index}
                id={index}
                dragIcon
              />
            )
          );
        })}
      </div>
      <BurgerComponentItem
        type="bottom"
        name={
          isBunAdded
            ? burgerData.find(
                (item) => item._id === addedIngreds[addedIngreds.length - 1]
              ).name
            : "Выберите булку"
        }
        price={
          isBunAdded
            ? burgerData.find(
                (item) => item._id === addedIngreds[addedIngreds.length - 1]
              ).price
            : ""
        }
        thumbnail={
          isBunAdded
            ? burgerData.find(
                (item) => item._id === addedIngreds[addedIngreds.length - 1]
              ).image
            : NoItem
        }
        isLocked={isBunAdded}
      />
    </div>
  );
}

function PlaceOrder(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { addedIngreds, orderNum } = useSelector(
    (store) => store.constructorsReducer
  );

  const sendDataToOrder = async (url, items) => {
    const data = { ingredients: items };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(res.status.toString());
    }
  };

  const handleOpenModal = async () => {
    try {
      dispatch({ type: MAKE_ORDER });

      const data = await sendDataToOrder(orderUrl, [...addedIngreds]);
      if (data.success) {
        dispatch({ type: MAKE_ORDER_SUCCESS, orderNum: data.order.number });
        // setOrderNum(data.order.number);
        setModalVisible(true);
      } else {
        dispatch({ type: MAKE_ORDER_FAILED });
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
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
              <OrderDetails orderNum={orderNum} />
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
  const { totalPrice } = useSelector((store) => store.constructorsReducer);

  return (
    <section className={`${styles.wrapper} pt-25`}>
      <BurgerComponentsList />
      <PlaceOrder price={totalPrice} />
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   burgerData: PropTypes.arrayOf(ServerDataTypes.isRequired),
// };
export default BurgerConstructor;
