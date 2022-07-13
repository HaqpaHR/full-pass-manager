import axios from "axios";
import { setUser } from "../reducers/userReducer";
import {getPass} from "../reducers/userPasswordsReducer";
import {Action, Dispatch} from "redux";

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:5000/registration`, {
      email,
      password,
    });
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (email: string, password: string) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    try {
      const response = await axios.post(`http://localhost:5000/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch: Dispatch<Action<any>>) => {
    try {
      const response = await axios.get(`http://localhost:5000/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      alert(e.response.data.message);
      localStorage.removeItem("token");
    }
  };
};
