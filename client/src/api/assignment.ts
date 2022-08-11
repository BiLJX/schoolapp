import { UploadAssignmentData } from "redux/UploadAssignment/uploadAssignmentTypes";
import { Assignment, AssignmentFeed, AssignmentStatus } from "@shared/Assignment"
import axios from "./instance";

export const createAssignment = async(assignment_data: UploadAssignmentData) => {
    const res = await axios.post("/api/assignment/create", assignment_data);
    return res.data as ApiResponse<Assignment>
}

export const getStudentsAssignment = async(filter: AssignmentStatus|"all") => {
    const res = await axios.get("/api/assignment", {
        params: {
            status: filter
        }
    });
    return res.data as ApiResponse<AssignmentFeed[]>
}

export const getAssignmentById = async(id: string) => {
    const res = await axios.get("/api/assignment/"+id);
    return res.data as ApiResponse<Assignment>;
}

export const getGivenAssignments = async () => {
    const res = await axios.get("/api/assignment/given");
    return res.data as ApiResponse<AssignmentFeed[]>;
}

export const getAssignedStudents = async (id: string) => {
    const res = await axios.get(`/api/assignment/${id}/assigned`);
    return res.data as ApiResponse<{full_name: string, user_id: string, profile_picture_url: string, has_to_redo: boolean}[]>
}

export const submitAssignment = async (id: string, student_id: string) => {
    const res = await axios.put(`/api/assignment/${id}/submit`, {student_id});
    return res.data as ApiResponse;
}

export const redoAssignment = async (id: string, student_id: string) => {
    const res = await axios.put(`/api/assignment/${id}/redo`, {student_id});
    return res.data as ApiResponse;
}

export const deleteAssignment = async (id: string) => {
    const res = await axios.delete(`/api/assignment/${id}/delete`);
    return res.data as ApiResponse;
}