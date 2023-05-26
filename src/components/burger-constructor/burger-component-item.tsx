import { FC, useRef } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { moveComponentOfBurger, removeComponentFromBurger } from "../../services/actions/action-creator";
import styles from "./burger-constructor.module.css";
import {BUN_TOP, BUN_BOTTOM, } from "../../types/burger-constructor.d"
import {IBurgerComponentItems, IItemDrop} from "../../types/burger-constructor"

const BurgerComponentItem: FC<IBurgerComponentItems> = ({
    name,
    type,
    id,
    price,
    dragIcon,
    isLocked,
    thumbnail,
  }) => {
    const dispatch = useDispatch();
    let ingridName = name;
    if (type === BUN_TOP) {
      ingridName += " (верх)";
    } else if (type === BUN_BOTTOM) {
      ingridName += " (низ)";
    }
    const ref = useRef<HTMLDivElement>(null);
  
    const [, dragRef] = useDrag({
      type: "structureOfBurger",
      item: { id },
    });
  
    const [, dropRef] = useDrop({
      accept: "structureOfBurger",
      drop(item: IItemDrop) {
        dispatch(moveComponentOfBurger(item.id, id));
      },
    });
  
    dragRef(dropRef(ref));
    const onRemoveItemHandle = () => {
      dispatch(removeComponentFromBurger(id, price));
    };
  
    return (
      <div
        className={`${styles.burger_inrid_list_item} pr-4 pl-4`}
        ref={dragIcon ? ref : null}
      >
        {dragIcon && <DragIcon type="primary" />}
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={ingridName}
          price={price}
          thumbnail={thumbnail}
          handleClose={onRemoveItemHandle}
        />
      </div>
    );
  };
  
  export default BurgerComponentItem;