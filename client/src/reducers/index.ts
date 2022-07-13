import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import userPasswordsReducer from "./userPasswordsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
    user: userReducer,
    passwords: userPasswordsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))