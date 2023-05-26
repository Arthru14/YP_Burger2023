import { useSelector } from "react-redux";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./main-page.module.css";
import { useAuth } from "../services/auth";
import { useEffect } from "react";

export function MainPage() {
  const { isBurgerDataLoaded } = useSelector(
    (store: any) => store.ingredientReducer
  );
    const { getUser, ...auth } = useAuth();

  const init = async () => {
    await getUser();
  };

  useEffect(() => {
    init();
  }, []);


  return (
    <>
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
