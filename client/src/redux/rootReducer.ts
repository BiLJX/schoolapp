import { combineReducers } from "redux";
import { adminReducer } from "./Admin/adminReducer";
import { RootState } from "../types/states";

export const rootReducer = combineReducers<RootState>({
    admin: adminReducer
})