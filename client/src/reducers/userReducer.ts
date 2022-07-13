import {User} from "../types";

export interface IActions {
  SET_USER: string,
  LOG_OUT: string,
  GET_USER: string,
}

interface ISetUser {
  type: IActions,

}

const SET_USER = "SET_USER"
const LOG_OUT = "LOG_OUT"
const GET_USER = "GET_USER"

const defaultState = {
  currentUser: {},
  isAuth: false,
};

export default function userReducer(state = defaultState, action: any) {

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case LOG_OUT:
      localStorage.removeItem("token")
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };
    case GET_USER:
      return {
        ...state
      }
    default:
      return state;
  }
}

export const setUser = (user: User) => ({type: SET_USER, payload: user})
export const logout = () => ({type: LOG_OUT})
export const getUser = () => ({type: GET_USER})