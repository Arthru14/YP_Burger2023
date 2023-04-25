import { v4 as uuid } from "uuid";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  MAKE_ORDER,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_SUCCESS,
  MOVE_COMPONENT_BURGER,
  REMOVE_INGREDIENT,
} from "./burger-constructor";

export const addBunToConstructor = (id, price, priceBefore) => ({
  type: ADD_BUN,
  id: id,
  price: price,
  priceBefore: priceBefore,
  uniqueId: uuid(),
});

export const addIngridToConstructor = (id, price) => ({
  type: ADD_INGREDIENT,
  id: id,
  price: price,
  uniqueId: uuid(),
});

export const makeOrder = () => ({
  type: MAKE_ORDER,
});

export const makeOrderSuccess = (orderNum) => ({
  type: MAKE_ORDER_SUCCESS,
  orderNum: orderNum,
});

export const makeOrderFailed = () => ({
  type: MAKE_ORDER_FAILED,
});

export const moveComponentOfBurger = (fromId, toId) => ({
  type: MOVE_COMPONENT_BURGER,
  fromId: fromId,
  toId: toId,
});

export const removeComponentFromBurger = (id, price) => ({
  type: REMOVE_INGREDIENT,
  id: id,
  price: price,
});
