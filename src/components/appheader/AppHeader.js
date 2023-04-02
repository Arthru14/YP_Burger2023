import React from "react";
import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ulhr}>
          <li className="text text_type_main-default">
            <a href="#">
              <BurgerIcon type="primary" className="pr-2" />
              <span className="pl-2">Конструктор</span>
            </a>
          </li>
          <li>
            <a href="#" className="text text_type_main-default">
              <ListIcon type="secondary" />
              <span className="pl-2 text_color_inactive">Лента заказов</span>
            </a>
          </li>
        </ul>
        <Logo />
        <a href="#" className="text text_type_main-default text_color_inactive">
          <ProfileIcon type="secondary" />
          <span className="pl-2">Личный кабинет</span>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;
