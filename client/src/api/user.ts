import { Student, Teacher } from "@shared/User";
import { StudentPerformanceData, TimePeriods } from "@shared/Student-Performance"
import axios from "./instance";

export const getCurrentUser = async() => {
    const res = await axios.get("/api/user/current");
    return res.data as ApiResponse<Student|Teacher|null>;
}

export const getStudentById = async(user_id: string) => {
    const res = await axios.get("/api/user/student/"+user_id);
    return res.data as ApiResponse<Student|null>;
}

export const getTeacherById = async(user_id: string) => {
    const res = await axios.get("/api/user/teacher/"+user_id);
    return res.data as ApiResponse<Teacher|null>;
}

export const getStudentPerformanceMerit = async(user_id: string, time_period: TimePeriods) => {
    const res = await axios.get(`/api/user/student/${user_id}/performance/merits`, { params: {
        time_period
    }})
    return res.data as ApiResponse<StudentPerformanceData>;
}

export const getStudentPerformanceDemerit = async(user_id: string, time_period: TimePeriods) => {
    const res = await axios.get(`/api/user/student/${user_id}/performance/demerits`, { params: {
        time_period
    }})
    return res.data as ApiResponse<StudentPerformanceData>;
}

export const getStudentPerormanceMDOverall = async(user_id: string) => {
    const res = await axios.get(`/api/user/student/${user_id}/performance/overall/md`)
    return res.data as ApiResponse<{ratio: number, difference: number}>;
}