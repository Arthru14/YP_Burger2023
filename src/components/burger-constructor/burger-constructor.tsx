import {
  FC,
  Key,
  useRef,
} from "react";
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
import { useAppDispatch } from "../..";

interface IBurgerComponentItems {
  name: string;
  type?: "top" | "bottom" | undefined;
  id?: string | number;
  price: number;
  dragIcon?: boolean;
  isLocked?: boolean;
  thumbnail: string;
}

interface IIngridItem {
  uniqueId: Key;
  ingridId: any;
}

interface IPlaceOrder {
  price: number;
}

const BurgerComponentItem: FC<IBurgerComponentItems> = ({
  name,
  type,
  id,
  price,
  dragIcon,
  isLocked,
  thumbnail,
}) => {
  const dispatch = useDispatch();
  let ingridName = name;
  if (type === "top") {
    ingridName += " (верх)";
  } else if (type === "bottom") {
    ingridName += " (низ)";
  }
  const ref = useRef<HTMLDivElement>(null);

  const [, dragRef] = useDrag({
    type: "structureOfBurger",
    item: { id },
  });

  const [, dropRef] = useDrop({
    accept: "structureOfBurger",
    drop(item: any) {
      dispatch(moveComponentOfBurger(item.id, id));
    },
  });

  dragRef(dropRef(ref));
  const onRemoveItemHandle = () => {
    dispatch(removeComponentFromBurger(id, price));
  };

  return (
    <div
      className={`${styles.burger_inrid_list_item} pr-4 pl-4`}
      ref={dragIcon ? ref : null}
    >
      {dragIcon && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={ingridName}
        price={price}
        thumbnail={thumbnail}
        handleClose={onRemoveItemHandle}
      />
    </div>
  );
};

function BurgerComponentsList() {
  const dispatch = useDispatch();
  const burgerData = useSelector(
    (store: any) => store.ingredientReducer.itemsOfIngrids
  );
  const { isBunAdded } = useSelector((store: any) => store.constructorsReducer);
  const { addedIngreds } = useSelector(
    (store: any) => store.constructorsReducer
  );

  interface IItemDrop {
    id: string;
    price: number;
    isBunAdded: boolean;
    isBun: boolean;
  }

  const onDropHandler = (item: IItemDrop) => {
    if (item.isBun) {
      dispatch(
        addBunToConstructor(
          item.id,
          item.price,
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) => item._id === addedIngreds[0].ingridId
              ).price
            : 0
        )
      );
    } else {
      dispatch(addIngridToConstructor(item.id, item.price));
    }
  };

  const [, dropTarget] = useDrop({
    accept: "burger",
    drop(itemId: IItemDrop) {
      onDropHandler(itemId);
    },
  });

  return (
    <div className={styles.burger_inrid_list} ref={dropTarget}>
      <BurgerComponentItem
        type="top"
        name={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) => item._id === addedIngreds[0].ingridId
              ).name
            : "Выберите булку"
        }
        price={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) => item._id === addedIngreds[0].ingridId
              ).price
            : ""
        }
        thumbnail={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) => item._id === addedIngreds[0].ingridId
              ).image
            : NoItem
        }
        isLocked={isBunAdded}
      />
      <div className={styles.burger_inrid_inner_list}>
        {addedIngreds.map((ingridItem: IIngridItem, index: number) => {
          if (isBunAdded && (index === 0 || index === addedIngreds.length - 1))
            return "";
          return (
            ingridItem.uniqueId && (
              <BurgerComponentItem
                name={
                  burgerData.find(
                    (item: { _id: string }) => item._id === ingridItem.ingridId
                  ).name
                }
                price={
                  burgerData.find(
                    (item: { _id: string }) => item._id === ingridItem.ingridId
                  ).price
                }
                thumbnail={
                  burgerData.find(
                    (item: { _id: string }) => item._id === ingridItem.ingridId
                  ).image
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
                (item: { _id: string }) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).name
            : "Выберите булку"
        }
        price={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).price
            : ""
        }
        thumbnail={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).image
            : NoItem
        }
        isLocked={isBunAdded}
      />
    </div>
  );
}

const PlaceOrder: FC<IPlaceOrder> = ({ price }) => {
  const { ...auth } = useAuth();
  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useAppDispatch();
  const { addedIngreds, orderNum, currentOrderIsLoading } = useSelector(
    (store: any) => store.constructorsReducer
  );

  const handleOpenModal = () => {
    if (!auth.user) {
      navigate("/login");
      return false;
    }
    dispatch(getOrderFromServer(addedIngreds));
    !currentOrderIsLoading && openModal();
  };

  return (
    <div className={`${styles.place_order} pt-10 pr-4 pl-4`}>
      {price > 0 ? (
        <>
          <span className={`${styles.place_order_price} pr-10`}>
            <span className="text text_type_digits-default pr-4">{price}</span>
            <CurrencyIcon type="primary" />
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
};

function BurgerConstructor() {
  const { totalPrice } = useSelector((store: any) => store.constructorsReducer);

  return (
    <section className={`${styles.wrapper} pt-25`}>
      <BurgerComponentsList />
      <PlaceOrder price={totalPrice} />
    </section>
  );
}

export default BurgerConstructor;
