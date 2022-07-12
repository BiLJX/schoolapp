import { School } from "@shared/School";
import { AdminTypes } from "./adminTypes";

export function adminReducer(state: School|null = null, action: Action<AdminTypes, School>): School|null {
    switch(action.type){
        case AdminTypes.SIGN_IN:
            return action.payload;
        default:
            return state;
    }
}