import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ServerDataTypes from "../../utils/data-format";
import { IngridContext } from "../services/ingrid-context";

function Tabs() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={styles.tab_main}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
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
  return (
    <div
      className={`${styles.ingridItem} pr-3 pl-3 pt-6 pb-2`}
      onClick={() => props.onClick(true)}
    >
      <div className={styles.item_of_burger} key={props.id}>
        <img src={props.img} alt={props.name} />
        {props.count && (
          <Counter count={props.count} size="default" extraClass="m-1" />
        )}
      </div>
      <PriceOut price={props.price} />
      <span className="ext text_type_main-default">{props.name}</span>
    </div>
  );
}

function BurgerIngredients() {
  const burgerData = useContext(IngridContext);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <Tabs />
      <div className={`${styles.ingridList} custom-scroll`}>
        <div id="bunDiv">
          <h2 className="text text_type_main-medium pt-10">Булки</h2>
          <div className={styles.ingrid}>
            {burgerData &&
              burgerData.map &&
              burgerData.map((ingridItem, index) => {
                return ingridItem.type === "bun" ? (
                  <ItemOfBurger
                    key={ingridItem._id}
                    count={2}
                    price={ingridItem.price}
                    img={ingridItem.image}
                    name={ingridItem.name}
                    id={ingridItem._id}
                    onClick={() => {
                      setSelectedItem(index);
                      handleOpenModal();
                    }}
                  />
                ) : null;
              })}
          </div>
        </div>
        <div id="sauceDiv">
          <h2 className="text text_type_main-medium pt-2">Соусы</h2>
          <div className={styles.ingrid}>
            {burgerData &&
              burgerData.map &&
              burgerData.map((ingridItem, index) => {
                return ingridItem.type === "sauce" ? (
                  <ItemOfBurger
                    key={ingridItem._id}
                    count={2}
                    price={ingridItem.price}
                    img={ingridItem.image}
                    name={ingridItem.name}
                    id={ingridItem._id}
                    onClick={() => {
                      setSelectedItem(index);
                      handleOpenModal();
                    }}
                  />
                ) : null;
              })}
          </div>
        </div>
        <div id="mainDiv">
          <h2 className="text text_type_main-medium pt-2">Начинки</h2>
          <div className={styles.ingrid}>
            {burgerData &&
              burgerData.map &&
              burgerData.map((ingridItem, index) => {
                return ingridItem.type === "main" ? (
                  <ItemOfBurger
                    key={ingridItem._id}
                    count={2}
                    price={ingridItem.price}
                    img={ingridItem.image}
                    name={ingridItem.name}
                    id={ingridItem.id}
                    onClick={() => {
                      setSelectedItem(index);
                      handleOpenModal();
                    }}
                  />
                ) : null;
              })}
          </div>
        </div>
        {modalVisible && (
          <Modal
            onClose={() => setModalVisible(false)}
            title="Детали ингредиента"
          >
            <IngredientDetails ingridDetail={burgerData[selectedItem]} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  burgerData: PropTypes.arrayOf(ServerDataTypes.isRequired),
};
