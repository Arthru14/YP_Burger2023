import React from "react";
import styles from "./app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.navMenu}>
          <nav className={styles.nav}>
            <ul className={styles.ulhr}>
              <li className="text text_type_main-default">
                <a href="#">
                  <BurgerIcon type="secondary" className="pr-2" />
                  <span className="pl-2 text_color_inactive">Конструктор</span>
                </a>
              </li>
              <li>
                <a href="#" className="text text_type_main-default">
                  <ListIcon type="secondary" />
                  <span className="pl-2 text_color_inactive">
                    Лента заказов
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.navLogo}>
          <a href="#">
            <Logo />
          </a>
        </div>
        <div className={styles.navLogin}>
          <a
            href="#"
            className="text text_type_main-default text_color_inactive"
          >
            <ProfileIcon type="secondary" />
            <span className="pl-2">Личный кабинет</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
