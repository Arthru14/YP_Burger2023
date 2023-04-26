import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getBurgerData } from "../../services/actions/app";

function App() {
  const dispatch = useDispatch();
  const { isBurgerDataLoaded } = useSelector(
    (store) => store.ingredientReducer
  );

  useEffect(() => {
    dispatch(getBurgerData());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.wrapper}>
        <div className={styles.content}>
          {isBurgerDataLoaded && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
