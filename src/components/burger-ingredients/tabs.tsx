import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import styles from "./burger-ingredients.module.css";
import { ITabsProps } from "../../types/burger-ingredients";

const Tabs: FC<ITabsProps> = ({ active }) => {
  return (
    <div className={styles.tab_main}>
      <Tab
        value="one"
        active={active === "one"}
        onClick={() => "one"}
      >
        Булки
      </Tab>
      <Tab
        value="two"
        active={active === "two"}
        onClick={() => "two"}
      >
        Соусы
      </Tab>
      <Tab
        value="three"
        active={active === "three"}
        onClick={() => "three"}
      >
        Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
