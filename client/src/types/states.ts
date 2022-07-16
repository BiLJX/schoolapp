import { School } from "@shared/School";
import { Student, Teacher } from "@shared/User";

export interface RootState {
    admin: School|null,
    currentUser: Student|Teacher|null;
}