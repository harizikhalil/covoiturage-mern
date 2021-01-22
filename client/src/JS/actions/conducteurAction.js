import axios from "axios";

import {
  SET_LOADING_CARS,
  GET_CONDUCTEUR_CARS_FAIL,
  GET_CONDUCTEUR_CARS_SUCCES,
  ADD_CAR_FAIL,
  ADD_CAR_SUCCES,
  DELETE_CAR_FAIL,
  DELETE_CAR_SUCCES,
  GET_CONDUCTEUR_TRAJETS,
  GET_CONDUCTEUR_TRAJET_FAIL,
  GET_CONDUCTEUR_TRAJET_SUCCES,
  ADD_CONDUCTEUR_TRAJET,
  ADD_CONDUCTEUR_TRAJET_SUCCES,
  ADD_CONDUCTEUR_TRAJET_FAIL,
  DELETE_TRAJET_CONDUCTEUR_SUCCES,
  DELETE_TRAJET_CONDUCTEUR_FAIL,
  DELETE_TRAJET_CONDUCTEUR,
} from "../const";

export const getCars = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING_CARS,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  try {
    const res = await axios.get("/api/conducteur/mylistCars", config);
    dispatch({
      type: GET_CONDUCTEUR_CARS_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_CONDUCTEUR_CARS_FAIL,
    });
  }
};

export const addCar = (newcar) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  dispatch({
    type: SET_LOADING_CARS,
  });
  try {
    const res = await axios.post("/api/conducteur/addCar", newcar, config);
    dispatch({
      type: ADD_CAR_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    const response = error.response.data;
    // check if the response is an array and alert it
    if (Array.isArray(response)) {
      response.forEach((err) => {
        alert(err.msg);
      });
    }
    dispatch({
      type: ADD_CAR_FAIL,
    });
  }
};

export const deleteCar = (idCar) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  dispatch({
    type: SET_LOADING_CARS,
  });
  try {
    const res = await axios.delete(
      `/api/conducteur/deleteCar/${idCar}`,
      config
    );
    dispatch({
      type: DELETE_CAR_SUCCES,
      payload: idCar,
    });
  } catch (error) {
    const response = error.response.data;
    // check if the response is an array and alert it
    if (Array.isArray(response)) {
      response.forEach((err) => {
        alert(err.msg);
      });
    }
    dispatch({
      type: DELETE_CAR_FAIL,
    });
  }
};

export const getTrajets = () => async (dispatch) => {
  dispatch({
    type: GET_CONDUCTEUR_TRAJETS,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get("/api/conducteur/conducteurtrajets", config);
    dispatch({
      type: GET_CONDUCTEUR_TRAJET_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONDUCTEUR_TRAJET_FAIL,
    });
  }
};

export const addTrajet = (idcar, newtrajet) => async (dispatch) => {
  dispatch({
    type: ADD_CONDUCTEUR_TRAJET,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post(
      `/api/conducteur/addtrajet/${idcar}`,
      newtrajet,
      config
    );
    dispatch({
      type: ADD_CONDUCTEUR_TRAJET_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    const response = error.response.data;
    if (Array.isArray(response)) {
      response.forEach((err) => {
        alert(err.msg);
      });
    }
    dispatch({
      type: ADD_CONDUCTEUR_TRAJET_FAIL,
    });
  }
};

export const deleteTrajet = (idTrajet) => async (dispatch) => {
  dispatch({
    type: DELETE_TRAJET_CONDUCTEUR,
  });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.delete(
      `/api/conducteur/deleteTrajet/${idTrajet}`,
      config
    );

    dispatch({
      type: DELETE_TRAJET_CONDUCTEUR_SUCCES,
      payload: idTrajet,
    });
  } catch (error) {
    const response = error.response.data;
    // check if the response is an array and alert it
    console.log(response);
    if (Array.isArray(response)) {
      response.forEach((err) => {
        alert(err.msg);
      });
    }
    dispatch({
      type: DELETE_TRAJET_CONDUCTEUR_FAIL,
    });
  }
};
