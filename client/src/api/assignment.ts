import { UploadAssignmentData } from "redux/UploadAssignment/uploadAssignmentTypes";
import { Assignment } from "@shared/Assignment"
import axios from "./instance";

export const createAssignment = async(assignment_data: UploadAssignmentData) => {
    const res = await axios.post("/api/assignment/create", assignment_data);
    return res.data as ApiResponse<Assignment>
}