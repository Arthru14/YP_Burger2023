import { FC } from "react";
import PriceOut from "./price-out";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";
import { IItemOfBurgerProps } from "../../types/burger-ingredients";

const ItemOfBurger: FC<IItemOfBurgerProps> = ({
    isBun,
    id,
    price,
    img,
    name,
    onClick,
  }) => {
    const location = useLocation();
  
    const [, dragRef] = useDrag({
      type: "burger",
      item: { id, price, isBun },
    });
  
    const addedIngreds = useSelector(
      (store: any) => store.constructorsReducer.addedIngreds
    );
    const count = addedIngreds.filter(
      (item: { ingridId: string }) => item.ingridId === id
    ).length;
  
    return (
      <Link
        to={{
          pathname: `/ingredients/${id}`,
        }}
        state={{ background: location }}
      >
        <div
          className={`${styles.ingridItem} pr-3 pl-3 pt-6 pb-2`}
          onClick={onClick}
        >
          <div className={styles.item_of_burger} key={id} ref={dragRef}>
            <img src={img} alt={name} />
            {count > 0 && (
              <Counter count={count} size="default" extraClass="m-1" />
            )}
          </div>
          <PriceOut price={price} />
          <span className="ext text_type_main-default">{name}</span>
        </div>
      </Link>
    );
  };
  
  export default ItemOfBurger;