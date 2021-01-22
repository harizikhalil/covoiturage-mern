import {
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTH_FAIL,
  SET_LOADING,
  LOGOUT,
  GET_AUTH_USER,
} from "../const";

const initialState = {
  token: null,
  user: null,
  isLoading: false,
  isAuth: false,
  isRegister: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
    case LOGIN_USER:
    case SET_LOADING:
      return { ...state, isLoading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        user: payload.user,
        isRegister: true,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        user: null,
        token: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegister: true,
        user: payload.user,
        token: payload.token,
        isLoading: false,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        isRegister: false,
        isLoading: false,
        user: null,
        token: null,
      };
    case GET_AUTH_USER:
      return {
        ...state,
        isAuth: true,
        isRegister: true,
        isLoading: false,
        user: payload.user,
      };
    case AUTH_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        token: null,
        user: null,
        isRegister: false,
      };
    default:
      return state;
  }
};
