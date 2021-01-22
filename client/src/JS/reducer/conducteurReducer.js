import {
  SET_LOADING_CARS,
  GET_CONDUCTEUR_CARS_FAIL,
  GET_CONDUCTEUR_CARS_SUCCES,
  ADD_CAR_FAIL,
  ADD_CAR_SUCCES,
  LOGOUT,
  DELETE_CAR_FAIL,
  DELETE_CAR_SUCCES,
  GET_CONDUCTEUR_TRAJET_FAIL,
  GET_CONDUCTEUR_TRAJET_SUCCES,
  GET_CONDUCTEUR_TRAJETS,
  ADD_CONDUCTEUR_TRAJET_FAIL,
  ADD_CONDUCTEUR_TRAJET_SUCCES,
  ADD_CONDUCTEUR_TRAJET,
  DELETE_TRAJET_CONDUCTEUR,
  DELETE_TRAJET_CONDUCTEUR_FAIL,
  DELETE_TRAJET_CONDUCTEUR_SUCCES,
} from "../const";

const initialState = {
  cars: null,
  isLoadingCar: false,
  trajets: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_CARS:
    case GET_CONDUCTEUR_TRAJETS:
    case ADD_CONDUCTEUR_TRAJET:
    case DELETE_TRAJET_CONDUCTEUR:
      return { ...state, isLoadingCar: true };
    case GET_CONDUCTEUR_CARS_SUCCES:
      return {
        ...state,
        isLoadingCar: false,
        cars: payload,
      };
    case GET_CONDUCTEUR_CARS_FAIL:
    case GET_CONDUCTEUR_TRAJET_FAIL:
    case LOGOUT:
      return {
        ...state,
        cars: null,
        isLoadingCar: false,
        trajets: null,
      };
    case ADD_CAR_SUCCES:
      return {
        ...state,
        isLoadingCar: false,
        cars: [...state.cars, payload.car],
      };
    case ADD_CONDUCTEUR_TRAJET_SUCCES:
      return {
        ...state,
        isLoadingCar: false,
        trajets: [...state.trajets, payload.trajet],
      };
    case ADD_CAR_FAIL:
    case ADD_CONDUCTEUR_TRAJET_FAIL:
      return { ...state, isLoadingCar: false };
    case DELETE_CAR_SUCCES:
      return {
        ...state,
        isLoadingCar: false,
        cars: state.cars.filter((car) => car._id !== payload),
      };
    case DELETE_TRAJET_CONDUCTEUR_SUCCES:
      return {
        ...state,
        isLoadingCar: false,
        trajets: state.trajets.filter((trajet) => trajet._id !== payload),
      };
    case DELETE_CAR_FAIL:
    case DELETE_TRAJET_CONDUCTEUR_FAIL:
      return { ...state, isLoadingCar: false };
    case GET_CONDUCTEUR_TRAJET_SUCCES:
      return { ...state, isLoadingCar: false, trajets: payload };
    default:
      return state;
  }
};
