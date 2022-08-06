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