import { combineReducers } from "redux";
import { adminReducer } from "./Admin/adminReducer";
import { RootState } from "../types/states";
import { userReducer } from "./User/userReducer";

export const rootReducer = combineReducers<RootState>({
    admin: adminReducer,
    currentUser: userReducer
})