import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  CHANGE_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT,
} from "../../services/actions/burger-ingredients";
import { useDrag } from "react-dnd";
import { useModal } from "../../hooks/useModal";
import { Link, useLocation } from "react-router-dom";

interface ITabsProps {
  active: "one" | "two" | "three";
}

type TTabsProps = "one" | "two" | "three";

interface IPriceOutProps {
  price: number;
}

interface IItemOfBurgerProps {
  isBun?: boolean;
  id: string;
  price: number;
  img: string;
  name: string;
  onClick: () => void;
}

const Tabs: FC<ITabsProps> = ({ active }) => {
  return (
    <div className={styles.tab_main}>
      <Tab
        value="one"
        active={active === "one"}
        onClick={() => console.log("tab one")}
      >
        Булки
      </Tab>
      <Tab
        value="two"
        active={active === "two"}
        onClick={() => console.log("tab two")}
      >
        Соусы
      </Tab>
      <Tab
        value="three"
        active={active === "three"}
        onClick={() => console.log("tab three")}
      >
        Начинки
      </Tab>
    </div>
  );
};

const PriceOut: FC<IPriceOutProps> = ({ price }) => {
  return (
    <div className={`${styles.price_out_main} pt-1 pb-1`}>
      <span className="text text_type_digits-default pr-4">{price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

const ItemOfBurger: FC<IItemOfBurgerProps> = ({
  isBun,
  id,
  price,
  img,
  name,
  onClick,
}) => {
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: "burger",
    item: { id, price, isBun },
  });

  const addedIngreds = useSelector(
    (store: any) => store.constructorsReducer.addedIngreds
  );
  const count = addedIngreds.filter(
    (item: { ingridId: string }) => item.ingridId === id
  ).length;

  return (
    <Link
      to={{
        pathname: `/ingredients/${id}`,
      }}
      state={{ background: location }}
    >
      <div
        className={`${styles.ingridItem} pr-3 pl-3 pt-6 pb-2`}
        onClick={() => onClick()}
      >
        <div className={styles.item_of_burger} key={id} ref={dragRef}>
          <img src={img} alt={name} />
          {count > 0 && (
            <Counter count={count} size="default" extraClass="m-1" />
          )}
        </div>
        <PriceOut price={price} />
        <span className="ext text_type_main-default">{name}</span>
      </div>
    </Link>
  );
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

  const burgerData = useSelector(
    (store: any) => store.ingredientReducer.itemsOfIngrids
  );
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
            {burgerData.map(
              (
                ingridItem: {
                  type: string;
                  _id: string;
                  price: number;
                  image: string;
                  name: string;
                },
                index: number
              ) => {
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
              }
            )}
          </div>
        </div>
        <div id="sauceDiv" ref={refSauce}>
          <h2 className="text text_type_main-medium pt-2">Соусы</h2>
          <div className={styles.ingrid}>
            {burgerData.map(
              (
                ingridItem: {
                  type: string;
                  _id: string;
                  price: number;
                  image: string;
                  name: string;
                },
                index: number
              ) => {
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
              }
            )}
          </div>
        </div>
        <div id="mainDiv" ref={refMain}>
          <h2 className="text text_type_main-medium pt-2">Начинки</h2>
          <div className={styles.ingrid}>
            {burgerData.map(
              (
                ingridItem: {
                  type: string;
                  _id: string;
                  price: number;
                  image: string;
                  name: string;
                },
                index: number
              ) => {
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
              }
            )}
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
