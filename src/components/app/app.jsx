import React from "react";
import { ReactDOM } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import DataFromServer from "../../utils/data";

const urlBurgerData = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [burgerData, setBurgerData] = React.useState();
  const [burgerDataLoading, setBurgerDataLoading] = React.useState(false);

  // const getBurgerData = async () => {
  //   const response = await fetch(
  //     "https://norma.nomoreparties.space/api/ingredients"
  //   );
  //   const data = await response.json();
  //   setBurgerData(data.data);
  //   //  fetch("https://norma.nomoreparties.space/api/ingredients")
  //   //   .then((response) => response.json())
  //   //   .then((res) => setBurgerData(res.data))
  //   //   .catch((e) => console.log(e));
  //   console.log(burgerData);
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  // React.useEffect(() => {
  //   const getBurgerData = async () => {
  //     const response = await fetch(
  //       "https://norma.nomoreparties.space/api/ingredients"
  //     );
  //     const data = await response.json();
  //     setBurgerData(data.data);
  //     setBurgerDataLoading(true);
  //     burgerDataLoading && console.log(burgerData);
  //   };
  //   getBurgerData();
  // }, []);

  React.useEffect(() => {
    const getBurgerData = () => {
      return fetch(urlBurgerData)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("error get data");
        })
        .catch((err) => console.log(err));
    };
    getBurgerData().then((res) => {
      setBurgerData(res.data);
      setBurgerDataLoading(true);
    });
  }, []);

  return (
    <>
      <AppHeader />
      <section className={styles.wrapper}>
        <div className={styles.content}>
          {burgerDataLoading && <BurgerIngredients dataBurgers={burgerData} />}
          {burgerDataLoading && <BurgerConstructor dataBurgers={burgerData} />}
        </div>
      </section>
      <div id="react-modals"></div>
    </>
  );
}

export default App;
