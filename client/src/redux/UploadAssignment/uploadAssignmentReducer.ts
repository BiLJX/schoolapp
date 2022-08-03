import { ClassSchema } from "@shared/School";
import { UploadAssignmentActionTypes, UploadAssignmentData } from "./uploadAssignmentTypes";


const defaultState: UploadAssignmentData = {
    title: null,
    description: null,
    due: null,
    assigned_to: []
}
export function uploadAssignmentReducer(state: UploadAssignmentData = defaultState, action: Action<UploadAssignmentActionTypes, string|ClassSchema>): UploadAssignmentData{
    switch(action.type){
        case UploadAssignmentActionTypes.CHANGE_TITLE: {
            return {
                ...state,
                title: action.payload as string
            };
        }
        case UploadAssignmentActionTypes.CHANGE_DESCRIPTION: 
            return {
                ...state,
                description: action.payload as string
            };
        case UploadAssignmentActionTypes.CHANGE_DUE:
            return {
                ...state,
                due: action.payload as string
            };
        case UploadAssignmentActionTypes.ADD_CLASS: {
            const class_obj = action.payload as ClassSchema;
            return {
                ...state,
                assigned_to: [ ...state.assigned_to, class_obj ]
            }
        }
        case UploadAssignmentActionTypes.REMOVE_CLASS: {
            const class_id = action.payload as string;
            return {
                ...state,
                assigned_to: state.assigned_to.filter(x=>x.class_id !== class_id)
            }
        }
        case UploadAssignmentActionTypes.CLEAR:
            return state;
        default:
            return state;
    }
}