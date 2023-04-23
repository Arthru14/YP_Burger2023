import {
  MAKE_ORDER,
  MAKE_ORDER_FAILED,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  MAKE_ORDER_SUCCESS,
  SET_TOTAL_PRICE,
} from "../actions/burger-constructor";
import { TotalPriceContext } from "../total-price";

const initialState = {
  addedIngreds: [],
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
        newItems.push(action.id);
        newItems.unshift(action.id);
        return {
          ...state,
          addedIngreds: newItems,
          totalPrice:
            state.totalPrice - 2 * action.priceBefore + 2 * action.price,
        };
      } else {
        return {
          ...state,
          isBunAdded: true,
          addedIngreds: [action.id, ...state.addedIngreds, action.id],
          totalPrice:
            state.totalPrice - 2 * action.priceBefore + 2 * action.price,
        };
      }
    case ADD_INGREDIENT:
      if (state.isBunAdded) {
        const newItems = [...state.addedIngreds];
        newItems.splice(state.addedIngreds.length - 1, 0, action.id);
        return {
          ...state,
          addedIngreds: newItems,
          totalPrice: state.totalPrice + action.price,
        };
      } else {
        return state;
      }
    case REMOVE_INGREDIENT:
      const newIngredients = [...state.addedIngreds];
      newIngredients.splice(action.id, 1);
      return {
        ...state,
        addedIngreds: newIngredients,
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
