import axios from "axios";
import {getPass} from "../reducers/userPasswordsReducer";
import {Action, Dispatch} from "redux";
import {IActions} from "../reducers/userReducer";

export const add = async (name: string, password: string, id: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/add`, {
            name,
            password,
            id,
        });
    } catch (e) {
        console.log(e.response.data.message);
    }
};

export const getPasswords = (id: string) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await axios
                .get(`http://localhost:5000/`,{
                    params: {
                      userId: id,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            dispatch(getPass(response.data))
        } catch (e) {
            console.log(e.response.data.message);
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
    } catch (e) {
        console.log(e.response.data.message);
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
    } catch (e) {
        console.log(e.response.data.message);
    }
};
