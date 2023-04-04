import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <>
      <AppHeader />
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </section>
    </>
  );
}

export default App;
