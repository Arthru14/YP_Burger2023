import {
  MAKE_ORDER,
  MAKE_ORDER_FAILED,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  MAKE_ORDER_SUCCESS,
  SET_TOTAL_PRICE,
  MOVE_COMPONENT_BURGER,
} from "../actions/burger-constructor";
import { v4 as uuid } from "uuid";

const initialState = {
  addedIngreds: [{}],
  isBunAdded: false,
  orderNum: 0,
  currentOrderFailed: false,
  currentOrderIsLoading: false,
  totalPrice: 0,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      if (state.isBunAdded) {
        const newItems = [...state.addedIngreds];
        newItems.pop();
        newItems.shift();
        newItems.push({ uniqueId: uuid(), ingridId: action.id });
        newItems.unshift({ uniqueId: uuid(), ingridId: action.id });
        return {
          ...state,
          addedIngreds: newItems,
          totalPrice:
            state.totalPrice - 2 * action.priceBefore + 2 * action.price,
        };
      } else {
        return {
          ...state,
          uniqueId: uuid(),
          isBunAdded: true,
          addedIngreds: [
            { uniqueId: uuid(), ingridId: action.id },
            { uniqueId: uuid(), ingridId: action.id },
          ],
          totalPrice:
            state.totalPrice - 2 * action.priceBefore + 2 * action.price,
        };
      }
    case ADD_INGREDIENT:
      if (state.isBunAdded) {
        const newItems = [...state.addedIngreds];
        newItems.splice(state.addedIngreds.length - 1, 0, {
          uniqueId: uuid(),
          ingridId: action.id,
        });
        return {
          ...state,
          addedIngreds: newItems,
          totalPrice: state.totalPrice + action.price,
        };
      } else {
        return state;
      }
    case MOVE_COMPONENT_BURGER: {
      const newIngredList = [...state.addedIngreds];
      const tmpVar = newIngredList[action.fromId];
      newIngredList.splice(action.fromId, 1);
      newIngredList.splice(action.toId, 0, tmpVar);
      return {
        ...state,
        addedIngreds: newIngredList,
      };
    }
    case REMOVE_INGREDIENT:
      const newIngredList = [...state.addedIngreds];
      newIngredList.splice(action.id, 1);
      return {
        ...state,
        addedIngreds: newIngredList,
        totalPrice: state.totalPrice - action.price,
      };
    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.totalPrice,
      };
    case MAKE_ORDER:
      return {
        ...state,
        currentOrderIsLoading: true,
        currentOrderFailed: false,
      };
    case MAKE_ORDER_SUCCESS:
      return {
        ...state,
        orderNum: action.orderNum,
        currentOrderIsLoading: false,
        currentOrderFailed: false,
      };
    case MAKE_ORDER_FAILED:
      return {
        ...state,
        currentOrderIsLoading: false,
        currentOrderFailed: true,
      };
    default:
      return state;
  }
};
