import { School } from "@shared/School";
import { AdminTypes } from "./adminTypes";

export function adminSignIn(admin: School): Action<AdminTypes, School>{
    return {
        type: AdminTypes.SIGN_IN,
        payload: admin
    }
}