import React, {useState} from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngridContext } from "../services/ingrid-context";
import { TotalPriceContext } from "../services/total-price";

const urlBurgerData = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [burgerData, setBurgerData] = useState();
  const [burgerDataLoading, setBurgerDataLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

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
          {burgerDataLoading && (
            <TotalPriceContext.Provider value={{totalPrice, setTotalPrice}}>
              <IngridContext.Provider value={burgerData}>
                <BurgerIngredients />
                <BurgerConstructor value={burgerData} />
              </IngridContext.Provider>
            </TotalPriceContext.Provider>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
