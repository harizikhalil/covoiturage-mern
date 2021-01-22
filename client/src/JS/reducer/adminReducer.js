import {
  GET_ALL_CONDUCTEURS,
  GET_ALL_CONDUCTEUR_FAIL,
  GET_ALL_CONDUCTEURS_SUCCES,
  GET_ALL_PASSAGERS_FAIL,
  GET_ALL_PASSAGERS_SUCCES,
  GET_ALL_PASSAGERS,
  GET_ALL_TRAJET_ADMIN_FAIL,
  GET_ALL_TRAJET_ADMIN_SUCCES,
  GET_ALL_TRAJET_ADMIN,
  GET_TRAJET_BYID,
  GET_TRAJET_BYID_FAIL,
  GET_TRAJET_BYID_SUCCES,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCES,
  DELETE_TRAJET,
  DELETE_TRAJET_SUCCES,
  DELETE_TRAJET_FAIL,
} from "../const";

const initialState = {
  isLoading: false,
  listConducteurs: [],
  listPassagers: [],
  listTrajets: [],
  trajetsConducteur: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_CONDUCTEURS:
    case GET_ALL_PASSAGERS:
    case GET_ALL_TRAJET_ADMIN:
    case GET_TRAJET_BYID:
    case DELETE_USER:
    case DELETE_TRAJET:
      return { ...state, isLoading: true };
    case GET_ALL_CONDUCTEURS_SUCCES:
      return { ...state, isLoading: false, listConducteurs: payload };
    case GET_ALL_PASSAGERS_SUCCES:
      return { ...state, isLoading: false, listPassagers: payload };
    case GET_ALL_TRAJET_ADMIN_SUCCES:
      return { ...state, isLoading: false, listTrajets: payload };
    case GET_TRAJET_BYID_SUCCES:
      return { ...state, isLoading: false, trajetsConducteur: payload };
    case DELETE_USER_SUCCES:
      return {
        ...state,
        isLoading: false,
        listPassagers: state.listPassagers.filter(
          (passager) => passager._id !== payload
        ),
        listConducteurs: state.listConducteurs.filter(
          (conducteur) => conducteur._id !== payload
        ),
      };
    case DELETE_TRAJET_SUCCES:
      return {
        ...state,
        isLoading: false,
        listTrajets: state.listTrajets.filter(
          (trajet) => trajet._id !== payload
        ),
      };
    case GET_ALL_CONDUCTEUR_FAIL:
    case GET_ALL_PASSAGERS_FAIL:
    case GET_ALL_TRAJET_ADMIN_FAIL:
    case GET_TRAJET_BYID_FAIL:
    case DELETE_USER_FAIL:
    case DELETE_TRAJET_FAIL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
