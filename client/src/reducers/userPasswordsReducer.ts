const GET_PASSWORDS = "GET_PASSWORDS";

const defaultState = {
    data: [],
}


export default function userPasswordsReducer(state = defaultState, action: any) {
    switch (action.type) {
        case GET_PASSWORDS:
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state
    }
}

export const getPass = (data: any) => ({type: GET_PASSWORDS, payload: data})
