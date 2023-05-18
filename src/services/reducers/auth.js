import {
  LOGIN,
  LOGOUT,
  REGISTER,
  TOKEN,
  RESET_PASSWORD,
  SAVE_PASSWORD,
  UPDATE_PROFILE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  REGISTER_PROCESS,
  LOGIN_PROCESS,
} from "../actions/auth";

const initialState = {
  currentUser: {
    loaded: false,
    name: "",
    email: "",
    password: "",
  },
  // accessToken: "",
  // refreshToken: "",
  resetSuccess: false,
  savePasswordSuccess: false,
  logoutSuccess: false,
  isLoginProcess: false,
  isLoggedIn: false,
  isRegProcess: false,
  getUserRequest: false,
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PROCESS:
      return {
        ...state,
        isRegProcess: true,
      };
    case REGISTER:
      return {
        ...state,
        isRegProcess: false,
        currentUser: {
          ...state.currentUser,
          name: action.data.name,
          email: action.data.email,
        },
        // accessToken: action.data.accessToken,
        // refreshToken: action.data.refreshToken,
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
    case LOGIN_PROCESS:
      return {
        ...state,
        isLoginProcess: true,
      };
    case LOGIN:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          name: action.res.user.name,
          email: action.res.user.email,
        },
        // accessToken: action.res.accessToken,
        // refreshToken: action.res.refreshToken,
        isLoginProcess: false,
        isLoggedIn: true,
        getUserRequest: false,
      };
    case LOGOUT:
      return {
        ...initialState,
        logoutSuccess: true,
        isLoggedIn: false,
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
    case GET_USER_REQUEST:
      return {
        ...state,
        getUserRequest: true,
        currentUser: {
          ...state.currentUser,
          name: "",
          email: "",
        },
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        getUserRequest: false,
        currentUser: {
          ...state.currentUser,
          name: action.res.user.name,
          email: action.res.user.email,
        },
        // accessToken: action.accessToken,
        // refreshToken: action.refreshToken,
        isLoggedIn: true,
      };
    case TOKEN:
      return state;
    default:
      return state;
  }
};
