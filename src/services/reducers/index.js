import { combineReducers } from "redux";

import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { userInfoReducer } from "./auth";

export const rootReducer = combineReducers({
  ingredientReducer: burgerIngredientsReducer,
  constructorsReducer: burgerConstructorReducer,
  userReducer: userInfoReducer,
});
