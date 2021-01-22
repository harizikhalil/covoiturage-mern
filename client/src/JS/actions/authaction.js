import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  AUTH_FAIL,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  SET_LOADING,
  LOGOUT,
  GET_AUTH_USER,
} from "../const";

//GET AUTH USER

export const getAuthUser = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get("/api/user/current", config);

    dispatch({
      type: GET_AUTH_USER,
      payload: res.data, // { user : {name , lastName , ... }}
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

//Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/register", formData);
    dispatch({
      type: REGISTER_USER,
    });
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data, // { user : {name , lastName , ... }}
    });
  } catch (error) {
    //response is the error array from the server
    const response = error.response.data;
    // check if the response is an array and alert it
    if (Array.isArray(response)) {
      response.forEach((err) => {
        toast.warn(err.msg, {
          className: "error-toast",
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
    console.log(response);
    dispatch({
      type: REGISTER_USER_FAIL,
    });
  }
};

//Login User

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/login", formData);

    // save the token in the localstorage
    localStorage.setItem("token", res.data.token);
    console.log(res.data.user.Name);
    // dispatch the action with a payload
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data, // {token , user  }
    });
  } catch (error) {
    //response is the error array from the server
    const response = error.response.data;
    // check if the response is an array and alert it
    if (Array.isArray(response)) {
      response.forEach((err) => {
        toast.warn(err.msg, {
          className: "error-toast",
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }

    dispatch({
      type: LOGIN_USER_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
  });
};
