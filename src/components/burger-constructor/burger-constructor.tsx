import { useSelector } from "react-redux";
import styles from "./burger-constructor.module.css";
import PlaceOrder from "./place-order";
import BurgerComponentsList from "./burger-components-list";

function BurgerConstructor() {
  const { totalPrice } = useSelector((store: any) => store.constructorsReducer);

  return (
    <section className={`${styles.wrapper} pt-25`}>
      <BurgerComponentsList />
      <PlaceOrder price={totalPrice} />
    </section>
  );
}

export default BurgerConstructor;
