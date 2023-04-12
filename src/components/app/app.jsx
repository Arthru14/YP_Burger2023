import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const urlBurgerData = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [burgerData, setBurgerData] = React.useState();
  const [burgerDataLoading, setBurgerDataLoading] = React.useState(false);

  React.useEffect(() => {
    const getBurgerData = () => {
      return fetch(urlBurgerData).then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("error get data");
      });
    };
    getBurgerData()
      .then((res) => {
        setBurgerData(res.data);
        setBurgerDataLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.wrapper}>
        <div className={styles.content}>
          {burgerDataLoading && <BurgerIngredients dataBurgers={burgerData} />}
          {burgerDataLoading && <BurgerConstructor dataBurgers={burgerData} />}
        </div>
      </main>
    </>
  );
}

export default App;
