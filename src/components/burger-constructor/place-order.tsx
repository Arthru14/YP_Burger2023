import { FC } from "react";
import { useAuth } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useAppDispatch } from "../..";
import { useSelector } from "react-redux";
import { getOrderFromServer } from "../../services/actions/get-order";
import styles from "./burger-constructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IPlaceOrder } from "../../types/burger-constructor";

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

  export default PlaceOrder;