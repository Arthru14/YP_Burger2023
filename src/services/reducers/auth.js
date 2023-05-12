import {
  LOGIN,
  LOGOUT,
  REGISTER,
  TOKEN,
  RESET_PASSWORD,
  SAVE_PASSWORD,
  UPDATE_PROFILE,
  // LOAD_PROFILE_FAILED,
} from "../actions/auth";

const initialState = {
  currentUser: {
    loaded: false,
    name: "",
    email: "",
    password: "",
  },
  accessToken: "",
  refreshToken: "",
  resetSuccess: false,
  savePasswordSuccess: false,
  logoutSuccess: false,
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          name: action.data.name,
          email: action.data.email,
        },
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetSuccess: true,
      };
    case SAVE_PASSWORD:
      return {
        ...state,
        resetSuccess: false,
        savePasswordSuccess: true,
      };
    case LOGIN:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          name: action.data.user.name,
          email: action.data.user.email,
        },
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };
    case LOGOUT:
      return {
        ...initialState,
        logoutSuccess: true,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loaded: true,
          name: action.user.name,
          email: action.user.email,
        },
      };
    // case LOAD_PROFILE_FAILED:
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       loaded: true,
    //     },
    //   };
    case TOKEN:
      return state;
    default:
      return state;
  }
};
