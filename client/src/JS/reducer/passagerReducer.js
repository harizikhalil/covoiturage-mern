import {
  GET_ALL_TRAJETS,
  GET_ALL_TRAJETS_FAIL,
  GET_ALL_TRAJETS_SUCCES,
  RESERVE_TRAJET,
  RESERVE_TRAJET_FAIL,
  RESERVE_TRAJET_SUCCES,
  GET_TRAJETS_RESERVER_FAIL,
  GET_TRAJETS_RESERVER_SUCCES,
  GET_TRAJETS_RESERVER,
  ANNULER_TRAJET_FAIL,
  ANNULER_TRAJET_SUCCES,
  ANNULER_TRAJET,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCES,
  GET_PROFILE,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_SUCCES,
  ADD_COMMENT,
} from "../const";

const initialState = {
  allTrajets: null,
  TrajetsReserver: null,
  passagerLoading: false,
  profile: null,
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_TRAJETS:
    case RESERVE_TRAJET:
    case GET_TRAJETS_RESERVER:
    case ANNULER_TRAJET:
    case GET_PROFILE:
    case ADD_COMMENT:
      return { ...state, passagerLoading: true };
    case GET_ALL_TRAJETS_SUCCES:
      return { ...state, passagerLoading: false, allTrajets: payload };
    case GET_ALL_TRAJETS_FAIL:
      return {
        ...state,
        allTrajets: null,
        TrajetsReserver: null,
        passagerLoading: false,
      };
    case RESERVE_TRAJET_SUCCES:
      return {
        ...state,
        passagerLoading: false,
        allTrajets: state.allTrajets.filter((trajet) => trajet._id !== payload),
      };
    case ANNULER_TRAJET_SUCCES:
      return {
        ...state,
        passagerLoading: false,
        TrajetsReserver: state.TrajetsReserver.filter(
          (trajet) => trajet._id !== payload
        ),
      };
    case RESERVE_TRAJET_FAIL:
    case GET_TRAJETS_RESERVER_FAIL:
    case ANNULER_TRAJET_FAIL:
    case ADD_COMMENT_FAIL:
      return { ...state, passagerLoading: false };
    case GET_TRAJETS_RESERVER_SUCCES:
      return { ...state, passagerLoading: false, TrajetsReserver: payload };
    case GET_PROFILE_SUCCES:
      return { ...state, passagerLoading: false, profile: payload.user };
    case GET_PROFILE_FAIL:
      return { ...state, passagerLoading: false, profile: null };
    case ADD_COMMENT_SUCCES:
      return { ...state, passagerLoading: false, profile: payload };
    default:
      return state;
  }
};
