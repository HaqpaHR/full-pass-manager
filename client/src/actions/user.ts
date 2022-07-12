import axios from "axios";
import { setUser } from "../reducers/userReducer";
import {getPass} from "../reducers/userPasswordsReducer";

export const registration = async (email: string, password: string) => {
  console.log("mail", email);
  console.log("password", password);
  try {
    const response = await axios.post(`http://localhost:5000/registration`, {
      email,
      password,
    });
    alert(response.data.message);
  } catch (e: any) {
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
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`http://localhost:5000/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e: any) {
      alert(e.response.data.message);
      localStorage.removeItem("token");
    }
  };
};

export const add = async (name: string, password: string, id: string) => {
  try {
    const response = await axios.post(`http://localhost:5000/add`, {
      name,
      password,
      id,
    });
  } catch (e: any) {
    alert(e.response.data.message);
  }
};

export const getPasswords = (id: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios
          .get(`http://localhost:5000/`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
      dispatch(getPass(response.data))
    } catch (e: any) {
      alert(e.response.data.message);
    }
  }
};

export const deletePasswords = async (id: string) => {
    try {
      const response = await axios
          .delete(`http://localhost:5000/delete`,{
            params: id,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
      console.log(response.data.message)
    } catch (e: any) {
      alert(e.response.data.message);
    }
};

export const editPassword = async (id: string, name: string, password: string) => {
  try {
    const response = await axios
        .post(`http://localhost:5000/edit`,{
          id,
          name,
          password
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

        })
    console.log(response.data.message)
  } catch (e: any) {
    alert(e.response.data.message);
  }
};

