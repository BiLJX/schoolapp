import { ClassSchema } from "@shared/School";

export enum UploadAssignmentActionTypes {
    CHANGE_TITLE = "CHANGE_UPLOAD_ASSIGNMENT_TITLE",
    CHANGE_DESCRIPTION = "CHANGE_UPLOAD_ASSIGNMENT_DESCRIPTION",
    CHANGE_DUE = "CHANGE_UPLOAD_ASSIGNMENT_DUE",
    REMOVE_CLASS = "REMOVE_UPLOAD_ASSIGNMENT_CLASS",
    ADD_CLASS = "ADD_UPLOAD_ASSIGNMENT_CLASS",
    ADD_POINTS = "ADD_ASSIGNMENT_POINTS",
    CLEAR= "CLEAR_UPLOAD_ASSIGNMENT"
}

export interface UploadAssignmentData {
    title: string|null,
    description: string|null,
    due: string|null,
    points: number|null, 
    assigned_to: ClassSchema[]
}