import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

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
    <div className={`${styles.ingridItem} pr-3 pl-3 pt-6 pb-2`}>
      <div style={{ position: "relative" }}>
        <img src="https://code.s3.yandex.net/react/code/bun-01.png" />
        {props.count && (
          <Counter count={props.count} size="default" extraClass="m-1" />
        )}
      </div>
      <PriceOut price={props.price ? props.price : "---"} />
      <span className="ext text_type_main-default">Краторная булка N-200i</span>
    </div>
  );
}

function BurgerIngredients() {
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div>
        <Tabs />
      </div>
      <div className={`${styles.ingridList} custom-scroll`}>
        <div>
          <h2 className="text text_type_main-medium pt-10">Булки</h2>
          <div className={styles.ingrid}>
            <ItemOfBurger count="2" price="20" />
            <ItemOfBurger />
            <ItemOfBurger />
            <ItemOfBurger />
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium pt-2">Соусы</h2>
          <div className={styles.ingrid}>
            <ItemOfBurger />
            <ItemOfBurger />
            <ItemOfBurger />
            <ItemOfBurger />
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium pt-2">Начинки</h2>
          <div className={styles.ingrid}>
            <ItemOfBurger />
            <ItemOfBurger />
            <ItemOfBurger />
            <ItemOfBurger />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
