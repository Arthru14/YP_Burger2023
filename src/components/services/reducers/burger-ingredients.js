import {
  LOAD_INGREDIENTS,
  LOAD_INGREDIENTS_FAILED,
  LOAD_INGREDIENTS_SUCCESS,
  CHANGE_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT,
} from "../actions/burger-ingredients";

const initialState = {
  itemsOfIngrids: [],
  selectedItem: {},
  currentCategory: undefined,
  categoryIds: [],
  isBurgerDataLoading: false,
  isBurgerDataLoaded: false,
  burgerDataLoadingFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INGREDIENTS:
      return {
        ...state,
        isBurgerDataLoading: true,
        burgerDataLoadingFailed: false,
      };
    case LOAD_INGREDIENTS_FAILED:
      return {
        ...state,
        isBurgerDataLoading: false,
        burgerDataLoadingFailed: true,
      };
    case LOAD_INGREDIENTS_SUCCESS:
      return {
        ...state,
        itemsOfIngrids: action.itemsOfIngrids,
        isBurgerDataLoading: false,
        burgerDataLoadingFailed: false,
        isBurgerDataLoaded: true,
      };
    case CHANGE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          ...state.itemsOfIngrids.find((ingr) => ingr._id === action.id),
        },
      };
    case CLEAR_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedItem: {},
      };
    default:
      return state;
  }
};
