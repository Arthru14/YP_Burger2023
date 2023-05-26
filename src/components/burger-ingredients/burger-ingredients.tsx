import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  CHANGE_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT,
} from "../../services/actions/burger-ingredients";
import { useModal } from "../../hooks/useModal";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";
import ItemOfBurger from "./item-of-burger";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TTabsProps } from "../../types/burger-ingredients";

type TIngridItem = {
  type: string;
  _id: string;
  price: number;
  image: string;
  name: string;
};

function BurgerIngredients() {
  const [refBun, inViewBun] = useInView({
    threshold: 0.1,
  });
  const [refSauce, inViewSauce] = useInView({
    threshold: 0.1,
  });
  const [refMain, inViewMain] = useInView({
    threshold: 0.1,
  });

  const dispatch = useDispatch();

  const burgerData = useAppSelector<Array<TIngridItem>>(
    (store) => store.ingredientReducer.itemsOfIngrids
  );
  // const burgerData = useSelector(
  //   (store: any) => store.ingredientReducer.itemsOfIngrids
  // );
  const selectedItem = useSelector(
    (store: any) => store.ingredientReducer.selectedItem
  );

  const { isModalOpen, openModal, closeModal } = useModal();

  const [currentTab, setCurrentTab] = useState<TTabsProps>("one");

  const handleOpenModal = () => {
    openModal();
  };

  const activeTab = (): TTabsProps => {
    if (inViewBun) {
      return "one";
    } else if (inViewSauce) {
      return "two";
    } else if (inViewMain) {
      return "three";
    }
    return "one";
  };

  useEffect(() => {
    setCurrentTab(activeTab());
  }, [inViewBun, inViewSauce, inViewMain]);

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <Tabs active={currentTab} />
      <div className={`${styles.ingridList} custom-scroll`}>
        <div id="bunDiv" ref={refBun}>
          <h2 className="text text_type_main-medium pt-10">Булки</h2>
          <div className={styles.ingrid}>
            {burgerData.map((ingridItem) => {
              return ingridItem.type === "bun" ? (
                <ItemOfBurger
                  isBun
                  key={ingridItem._id}
                  price={ingridItem.price}
                  img={ingridItem.image}
                  name={ingridItem.name}
                  id={ingridItem._id}
                  onClick={() => {
                    dispatch({
                      type: CHANGE_SELECTED_INGREDIENT,
                      id: ingridItem._id,
                    });
                    handleOpenModal();
                  }}
                />
              ) : null;
            })}
          </div>
        </div>
        <div id="sauceDiv" ref={refSauce}>
          <h2 className="text text_type_main-medium pt-2">Соусы</h2>
          <div className={styles.ingrid}>
            {burgerData.map((ingridItem) => {
              return ingridItem.type === "sauce" ? (
                <ItemOfBurger
                  key={ingridItem._id}
                  price={ingridItem.price}
                  img={ingridItem.image}
                  name={ingridItem.name}
                  id={ingridItem._id}
                  onClick={() => {
                    dispatch({
                      type: CHANGE_SELECTED_INGREDIENT,
                      id: ingridItem._id,
                    });
                    handleOpenModal();
                  }}
                />
              ) : null;
            })}
          </div>
        </div>
        <div id="mainDiv" ref={refMain}>
          <h2 className="text text_type_main-medium pt-2">Начинки</h2>
          <div className={styles.ingrid}>
            {burgerData.map((ingridItem) => {
              return ingridItem.type === "main" ? (
                <ItemOfBurger
                  key={ingridItem._id}
                  price={ingridItem.price}
                  img={ingridItem.image}
                  name={ingridItem.name}
                  id={ingridItem._id}
                  onClick={() => {
                    dispatch({
                      type: CHANGE_SELECTED_INGREDIENT,
                      id: ingridItem._id,
                    });
                    handleOpenModal();
                  }}
                />
              ) : null;
            })}
          </div>
        </div>
        {isModalOpen && (
          <Modal
            onClose={() => {
              closeModal();
              window.history.replaceState(null, "", "/");
              dispatch({ type: CLEAR_SELECTED_INGREDIENT });
            }}
            title="Детали ингредиента"
            visible={!!selectedItem._id}
          >
            <IngredientDetails />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;
