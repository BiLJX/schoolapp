import { combineReducers } from "redux";
import { adminReducer } from "./Admin/adminReducer";
import { RootState } from "../types/states";
import { userReducer } from "./User/userReducer";
import feedReducer from "./Feed/feedReducer";
import inboxReducer from "./Inbox/inboxReducer";

export const rootReducer = combineReducers<RootState>({
    admin: adminReducer,
    currentUser: userReducer,
    feed: feedReducer,
    inbox: inboxReducer
})