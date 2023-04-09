import React from "react";
import PropTypes from "prop-types"
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ServerDataTypes from "../../utils/data-format"

function Tabs() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div style={{ display: "flex" }}>
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
    <div style={{ display: "flex", alignItem: "center" }} className="pt-1 pb-1">
      <span
        style={{ paddingRight: "4px" }}
        className="text text_type_digits-default"
      >
        {props.price}
      </span>
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
      <div style={{ position: "relative" }} key={props.id}>
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

function BurgerIngredients(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div>
        <Tabs />
      </div>
      <div className={`${styles.ingridList} custom-scroll`}>
        <div id="bunDiv">
          <h2 className="text text_type_main-medium pt-10">Булки</h2>
          <div className={styles.ingrid}>
            {props.dataBurgers.map((ingridItem, index) => {
              return ingridItem.type === "bun" ? (
                <ItemOfBurger
                  key={index}
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
        <div id="sauceDiv">
          <h2 className="text text_type_main-medium pt-2">Соусы</h2>
          <div className={styles.ingrid}>
            {props.dataBurgers.map((ingridItem, index) => {
              return ingridItem.type === "sauce" ? (
                <ItemOfBurger
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
        <div id="mainDiv">
          <h2 className="text text_type_main-medium pt-2">Начинки</h2>
          <div className={styles.ingrid}>
            {props.dataBurgers.map((ingridItem, index) => {
              return ingridItem.type === "main" ? (
                <ItemOfBurger
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
          <Modal setModalVisible={setModalVisible}>
            <IngredientDetails
              ingridientDetail={props.dataBurgers[selectedItem]}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  dataBurgers: PropTypes.arrayOf(ServerDataTypes.isRequired).isRequired
}