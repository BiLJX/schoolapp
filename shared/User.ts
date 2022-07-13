import { School, ClassSchema } from "./School"
export interface User {
    user_id: string,
    full_name: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    email_id: string,
    class_id: string,
    school_id: string,
    profile_picture_url: string,
    password: string,
    school: School,
    class: ClassSchema
}