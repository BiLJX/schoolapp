import { ClassSchema } from "@shared/School";
import { UploadAssignmentActionTypes } from "./uploadAssignmentTypes";
export namespace UploadAssignmentActions {
    export function changeAssignmentTitle(title: string): Action<UploadAssignmentActionTypes, string> {
        return {
            type: UploadAssignmentActionTypes.CHANGE_TITLE,
            payload: title
        }
    }
    export function changeAssignmentDescription(desc: string): Action<UploadAssignmentActionTypes, string> {
        return {
            type: UploadAssignmentActionTypes.CHANGE_DESCRIPTION,
            payload: desc
        }
    }
    export function changeAssignmentDue(due: string): Action<UploadAssignmentActionTypes, string> {
        return {
            type: UploadAssignmentActionTypes.CHANGE_DUE,
            payload: due
        }
    }
    export function addClass(class_obj: ClassSchema): Action<UploadAssignmentActionTypes, ClassSchema> {
        return {
            type: UploadAssignmentActionTypes.ADD_CLASS,
            payload: class_obj
        }
    }
    export function removeClass(class_id: string): Action<UploadAssignmentActionTypes, string> {
        return {
            type: UploadAssignmentActionTypes.REMOVE_CLASS,
            payload: class_id
        }
    }

    export function clear(): Action<UploadAssignmentActionTypes, string>{
        return {
            type: UploadAssignmentActionTypes.CLEAR,
            payload: ""
        }
    }
}