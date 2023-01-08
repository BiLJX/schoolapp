import { School, ClassSchema } from "./School";
export type Gender = "Male"|"Female";

export interface UserPersonalInformation {
    full_name: string;
    email: string;
    phone_no: number;
    DOB: string;
    gender: Gender;
    nationality: string;
}

export interface UserLocation {
    city_name: string,
    permanent_address: string,
    temporary_address: string,
    ward_no: string,
}

export interface UserTransportation {
    transport_by: "Self"|"Guardian"|"School Transportation",
    bus_route: string,
    bus_stop: string,
    pickup_time: string,
    dropoff_time: string
}

export interface UserMeal {
    meal_by: "Self"|"School",
    meal_type: "Veg"|"Non Veg"
}

interface User {
    user_id: string,
    full_name: string,
    first_name: string,
    gender: Gender,
    middle_name: string,
    last_name: string,
    email: string,
    school_id: string,
    profile_picture_url: string,
    password: string,
    school: School,
    email_verified: boolean,
    type: "student"|"teacher",
    DOB: Date,
    phone_no: number,
    nationality: string,
    location: UserLocation,
    meal: UserMeal,
    transportation: UserTransportation
}

export interface Student extends User {
    class_id: string,
    student_verified: boolean,
    class: ClassSchema,
    mothers_email: string,
    fathers_email: string,
    merits_count: number,
    type: "student",
    demerits_count: number,
}

export interface Teacher extends User {
    teacher_verified: boolean,
    type: "teacher"
}

export interface StudentSignupData {
    full_name: string,
    email: string,
    class_id: string,
    school_id: string,
    password: string,
    gender: Gender|"null"
}

export interface TeacherSignupData {
    full_name: string,
    email: string,
    school_id: string,
    password: string,
    gender: Gender|"null"
}

export interface UserSignupData {
    full_name: string,
    email: string,
    class_id: string,
    school_id: string,
    password: string,
    gender: Gender|"null",
    mothers_email: string,
    fathers_email: string
}
