import styles from "./burger-constructor.module.css";
import BurgerComponentItem from "./burger-component-item";
import NoItem from "../../images/no-item.png";
import { useDrop } from "react-dnd";
import {
  addBunToConstructor,
  addIngridToConstructor,
} from "../../services/actions/action-creator";
import { useDispatch, useSelector } from "react-redux";
import { IIngridItem, IItemDrop } from "../../types/burger-constructor";

function BurgerComponentsList() {
  const dispatch = useDispatch();
  const burgerData = useSelector(
    (store: any) => store.ingredientReducer.itemsOfIngrids
  );
  const { isBunAdded } = useSelector((store: any) => store.constructorsReducer);
  const { addedIngreds } = useSelector(
    (store: any) => store.constructorsReducer
  );

  const onDropHandler = (item: IItemDrop) => {
    if (item.isBun) {
      dispatch(
        addBunToConstructor(
          item.id,
          item.price,
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) => item._id === addedIngreds[0].ingridId
              ).price
            : 0
        )
      );
    } else {
      dispatch(addIngridToConstructor(item.id, item.price));
    }
  };

  const [, dropTarget] = useDrop({
    accept: "burger",
    drop(itemId: IItemDrop) {
      onDropHandler(itemId);
    },
  });

  return (
    <div className={styles.burger_inrid_list} ref={dropTarget}>
      <BurgerComponentItem
        type="top"
        name={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) => item._id === addedIngreds[0].ingridId
              ).name
            : "Выберите булку"
        }
        price={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) => item._id === addedIngreds[0].ingridId
              ).price
            : ""
        }
        thumbnail={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) => item._id === addedIngreds[0].ingridId
              ).image
            : NoItem
        }
        isLocked={isBunAdded}
      />
      <div className={styles.burger_inrid_inner_list}>
        {addedIngreds.map((ingridItem: IIngridItem, index: number) => {
          if (isBunAdded && (index === 0 || index === addedIngreds.length - 1))
            return "";
          return (
            ingridItem.uniqueId && (
              <BurgerComponentItem
                name={
                  burgerData.find(
                    (item: { _id: string }) => item._id === ingridItem.ingridId
                  ).name
                }
                price={
                  burgerData.find(
                    (item: { _id: string }) => item._id === ingridItem.ingridId
                  ).price
                }
                thumbnail={
                  burgerData.find(
                    (item: { _id: string }) => item._id === ingridItem.ingridId
                  ).image
                }
                key={ingridItem.uniqueId}
                id={index}
                dragIcon
              />
            )
          );
        })}
      </div>
      <BurgerComponentItem
        type="bottom"
        name={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).name
            : "Выберите булку"
        }
        price={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).price
            : ""
        }
        thumbnail={
          isBunAdded
            ? burgerData.find(
                (item: { _id: string }) =>
                  item._id === addedIngreds[addedIngreds.length - 1].ingridId
              ).image
            : NoItem
        }
        isLocked={isBunAdded}
      />
    </div>
  );
}

export default BurgerComponentsList;
