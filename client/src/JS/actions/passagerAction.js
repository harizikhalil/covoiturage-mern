import axios from "axios";
//import { config } from "../../utils/Config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_ALL_TRAJETS,
  GET_ALL_TRAJETS_FAIL,
  GET_ALL_TRAJETS_SUCCES,
  RESERVE_TRAJET,
  RESERVE_TRAJET_FAIL,
  RESERVE_TRAJET_SUCCES,
  GET_TRAJETS_RESERVER,
  GET_TRAJETS_RESERVER_FAIL,
  GET_TRAJETS_RESERVER_SUCCES,
  ANNULER_TRAJET,
  ANNULER_TRAJET_FAIL,
  ANNULER_TRAJET_SUCCES,
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCES,
  ADD_COMMENT,
  ADD_COMMENT_SUCCES,
  ADD_COMMENT_FAIL,
} from "../const";

export const getallTrajets = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_TRAJETS,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  try {
    const res = await axios.get("/api/passager/listTrajets", config);
    dispatch({
      type: GET_ALL_TRAJETS_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_ALL_TRAJETS_FAIL,
    });
  }
};

export const reserverTrajet = (idTrajet, NbrPlace) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  dispatch({
    type: RESERVE_TRAJET,
  });
  try {
    await axios.post(
      `/api/passager/reserverTrajet/${idTrajet}`,
      { NbrPlace },
      config
    );
    dispatch({
      type: RESERVE_TRAJET_SUCCES,
      payload: idTrajet,
    });
  } catch (error) {
    const response = error.response.data;
    // check if the response is an array and alert it
    if (Array.isArray(response)) {
      response.forEach((err) => {
        // alert(err.msg);
        toast.error(err.msg);
      });
    }
    dispatch({
      type: RESERVE_TRAJET_FAIL,
    });
  }
};

export const getTrajetsReserver = () => async (dispatch) => {
  dispatch({
    type: GET_TRAJETS_RESERVER,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get("/api/passager/myListTrajets", config);
    dispatch({
      type: GET_TRAJETS_RESERVER_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: GET_TRAJETS_RESERVER_FAIL,
    });
  }
};

export const annulerTrajet = (idTrajet) => async (dispatch) => {
  dispatch({
    type: ANNULER_TRAJET,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.delete(`/api/passager/annulerTrajet/${idTrajet}`, config);
    dispatch({
      type: ANNULER_TRAJET_SUCCES,
      payload: idTrajet,
    });
  } catch (error) {
    dispatch({
      type: ANNULER_TRAJET_FAIL,
    });
  }
};
export const getProfileByID = (idUser) => async (dispatch) => {
  dispatch({
    type: GET_PROFILE,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`/api/user/getuser/${idUser}`, config);
    dispatch({
      type: GET_PROFILE_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
    });
  }
};

export const addComment = (text, iduser) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post(
      `/api/passager/ajoutercommentaire/${iduser}`,
      { text },
      config
    );
    dispatch({
      type: ADD_COMMENT_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
    });
  }
};
