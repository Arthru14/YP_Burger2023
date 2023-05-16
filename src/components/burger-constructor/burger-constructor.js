import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import NoItem from "../../images/no-item.png";
import { useDrag, useDrop } from "react-dnd";
import { useModal } from "../../hooks/useModal";
import {
  addBunToConstructor,
  addIngridToConstructor,
  moveComponentOfBurger,
  removeComponentFromBurger,
} from "../../services/actions/action-creator";
import { getOrderFromServer } from "../../services/actions/get-order";
import { useAuth } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function BurgerComponentItem(props) {
  const dispatch = useDispatch();
  let ingridName = props.name;
  if (props.type === "top") {
    ingridName += " (верх)";
  } else if (props.type === "bottom") {
    ingridName += " (низ)";
  }
  const { id } = props;
  const ref = useRef(null);

  const [, dragRef] = useDrag({
    type: "structureOfBurger",
    item: { id },
  });

  const [, dropRef] = useDrop({
    accept: "structureOfBurger",
    drop(item) {
      dispatch(moveComponentOfBurger(item.id, id));
    },
  });

  dragRef(dropRef(ref));
  const onRemoveItemHandle = () => {
    dispatch(removeComponentFromBurger(props.id, props.price));
  };

  return (
    <div
      className={`${styles.burger_inrid_list_item} pr-4 pl-4`}
      ref={props.dragIcon ? ref : null}
    >
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
      dispatch(
        addBunToConstructor(
          item.id,
          item.price,
          isBunAdded
            ? burgerData.find((item) => item._id === addedIngreds[0].ingridId)
                .price
            : 0
        )
      );
    } else {
      dispatch(addIngridToConstructor(item.id, item.price));
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
            ? burgerData.find((item) => item._id === addedIngreds[0].ingridId)
                .name
            : "Выберите булку"
        }
        price={
          isBunAdded
            ? burgerData.find((item) => item._id === addedIngreds[0].ingridId)
                .price
            : ""
        }
        thumbnail={
          isBunAdded
            ? burgerData.find((item) => item._id === addedIngreds[0].ingridId)
                .image
            : NoItem
        }
        isLocked={isBunAdded}
      />
      <div className={styles.burger_inrid_inner_list}>
        {addedIngreds.map((ingridItem, index) => {
          if (isBunAdded && (index === 0 || index === addedIngreds.length - 1))
            return "";
          return (
            ingridItem.uniqueId && (
              <BurgerComponentItem
                name={
                  burgerData.find((item) => item._id === ingridItem.ingridId)
                    .name
                }
                price={
                  burgerData.find((item) => item._id === ingridItem.ingridId)
                    .price
                }
                thumbnail={
                  burgerData.find((item) => item._id === ingridItem.ingridId)
                    .image
                }
                key={ingridItem.uniqueId}
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
                (item) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).name
            : "Выберите булку"
        }
        price={
          isBunAdded
            ? burgerData.find(
                (item) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).price
            : ""
        }
        thumbnail={
          isBunAdded
            ? burgerData.find(
                (item) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).image
            : NoItem
        }
        isLocked={isBunAdded}
      />
    </div>
  );
}

function PlaceOrder(props) {
  const { user, getUser } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.userReducer.isLoggedIn);

  // const init = async () => {
  //   await getUser();
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useDispatch();
  const { addedIngreds, orderNum, currentOrderIsLoading } = useSelector(
    (store) => store.constructorsReducer
  );

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return false;
    }
    dispatch(getOrderFromServer(addedIngreds));
    !currentOrderIsLoading && openModal();
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
          {isModalOpen && (
            <Modal onClose={closeModal} visible={isModalOpen}>
              {!currentOrderIsLoading ? (
                <>
                  <OrderDetails orderNum={orderNum} />
                </>
              ) : (
                <p className="text text_type_main-medium">Загрузка данных...</p>
              )}
            </Modal>
          )}
        </>
      ) : (
        <Button htmlType="button" type="primary" size="medium" disabled>
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
