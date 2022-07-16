import { Student, Teacher } from "@shared/User";
import { UserTypes } from "./userTypes";
type ReducerType = Student|Teacher|null
export function userReducer(state: ReducerType = null, action: Action<UserTypes, ReducerType>): ReducerType{
    switch(action.type){
        case UserTypes.SIGN_IN:
            return action.payload;
        default:
            return state
    }
}