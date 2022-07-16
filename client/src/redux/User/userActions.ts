import { Student, Teacher } from "@shared/User";
import { UserTypes } from "./userTypes";

export function signInUser(user: Student|Teacher): Action<UserTypes, Student|Teacher> {
    return {
        type: UserTypes.SIGN_IN,
        payload: user
    }
}