import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
//import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
//import ServerDataTypes from "../../utils/data-format";
import {
  CHANGE_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT,
} from "../../services/actions/burger-ingredients";
import { useDrag } from "react-dnd";
import { useModal } from "../../hooks/useModal";

function Tabs(props) {
  return (
    <div className={styles.tab_main}>
      <Tab value="one" active={props.active === "one"}>
        Булки
      </Tab>
      <Tab value="two" active={props.active === "two"}>
        Соусы
      </Tab>
      <Tab value="three" active={props.active === "three"}>
        Начинки
      </Tab>
    </div>
  );
}

function PriceOut(props) {
  return (
    <div className={`${styles.price_out_main} pt-1 pb-1`}>
      <span className="text text_type_digits-default pr-4">{props.price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
}

function ItemOfBurger(props) {
  const { isBun, id, price } = props;
  const [, dragRef] = useDrag({
    type: "burger",
    item: { id, price, isBun },
  });

  const addedIngreds = useSelector(
    (store) => store.constructorsReducer.addedIngreds
  );
  const count = addedIngreds.filter((item) => item.ingridId === id).length;

  return (
    <div
      className={`${styles.ingridItem} pr-3 pl-3 pt-6 pb-2`}
      onClick={() => props.onClick(true)}
    >
      <div className={styles.item_of_burger} key={props.id} ref={dragRef}>
        <img src={props.img} alt={props.name} />
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      </div>
      <PriceOut price={props.price} />
      <span className="ext text_type_main-default">{props.name}</span>
    </div>
  );
}

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
    (store) => store.ingredientReducer.itemsOfIngrids
  );
  const selectedItem = useSelector(
    (store) => store.ingredientReducer.selectedItem
  );

  //const [modalVisible, setModalVisible] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [currentTab, setCurrentTab] = useState("one");

  const handleOpenModal = () => {
    openModal();
  };

  const activeTab = () => {
    if (inViewBun) {
      return "one";
    } else if (inViewSauce) {
      return "two";
    } else if (inViewMain) {
      return "three";
    }
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
            {burgerData.map((ingridItem, index) => {
              return ingridItem.type === "bun" ? (
                <ItemOfBurger
                  isBun
                  key={ingridItem._id}
                  count={2}
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
            {burgerData.map((ingridItem, index) => {
              return ingridItem.type === "sauce" ? (
                <ItemOfBurger
                  key={ingridItem._id}
                  count={2}
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
            {burgerData.map((ingridItem, index) => {
              return ingridItem.type === "main" ? (
                <ItemOfBurger
                  key={ingridItem._id}
                  count={2}
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
              dispatch({ type: CLEAR_SELECTED_INGREDIENT });
            }}
            title="Детали ингредиента"
          >
            <IngredientDetails
              name={selectedItem.name}
              imageLarge={selectedItem.image_large}
              calories={selectedItem.calories}
              proteins={selectedItem.proteins}
              fat={selectedItem.fat}
              carbohydrates={selectedItem.carbohydrates}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;

// BurgerIngredients.propTypes = {
//   burgerData: PropTypes.arrayOf(ServerDataTypes.isRequired),
// };
