import axios from "axios";
//import { config } from "../../utils/Config";
import { toast } from "react-toastify";
import {
  GET_ALL_CONDUCTEURS,
  GET_ALL_CONDUCTEUR_FAIL,
  GET_ALL_CONDUCTEURS_SUCCES,
  GET_ALL_PASSAGERS,
  GET_ALL_PASSAGERS_SUCCES,
  GET_ALL_PASSAGERS_FAIL,
  GET_ALL_TRAJET_ADMIN,
  GET_ALL_TRAJET_ADMIN_FAIL,
  GET_ALL_TRAJET_ADMIN_SUCCES,
  GET_TRAJET_BYID,
  GET_TRAJET_BYID_SUCCES,
  GET_TRAJET_BYID_FAIL,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCES,
  DELETE_TRAJET,
  DELETE_TRAJET_FAIL,
  DELETE_TRAJET_SUCCES,
} from "../const";

export const getAllConducteurs = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_CONDUCTEURS,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get("/api/admin/ListConducteur", config);
    dispatch({
      type: GET_ALL_CONDUCTEURS_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: GET_ALL_CONDUCTEUR_FAIL,
    });
  }
};

export const getAllPassagers = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_PASSAGERS,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get("/api/admin/ListPassager", config);
    dispatch({
      type: GET_ALL_PASSAGERS_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: GET_ALL_PASSAGERS_FAIL,
    });
  }
};

export const getAllTrajets = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_TRAJET_ADMIN,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get("/api/admin/ListTragets", config);
    dispatch({
      type: GET_ALL_TRAJET_ADMIN_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: GET_ALL_TRAJET_ADMIN_FAIL,
    });
  }
};

export const getTrajetByIdConducteur = (idconducteur) => async (dispatch) => {
  dispatch({
    type: GET_TRAJET_BYID,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(
      `/api/admin/getTrajetConducteur/${idconducteur}`,
      config
    );
    dispatch({
      type: GET_TRAJET_BYID_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: GET_TRAJET_BYID_FAIL,
    });
  }
};

export const deleteUser = (idUser) => async (dispatch) => {
  dispatch({
    type: DELETE_USER,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.delete(`/api/admin/deleteUser/${idUser}`, config);
    dispatch({
      type: DELETE_USER_SUCCES,
      payload: idUser,
    });
    toast.success("User removed", {
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
    });
  }
};

export const deleteTrajetAdmin = (idtrajet) => async (dispatch) => {
  dispatch({
    type: DELETE_TRAJET,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.delete(
      `/api/admin/deleteTrajetadmin/${idtrajet}`,
      config
    );
    dispatch({
      type: DELETE_TRAJET_SUCCES,
      payload: idtrajet,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: DELETE_TRAJET_FAIL,
    });
  }
};
