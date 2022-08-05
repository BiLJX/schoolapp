import { UploadAssignmentData } from "@shared/Assignment";
import { Teacher } from "@shared/User";
import { Assignments } from "../models/Assignment";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";

export const createAssignment: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser = res.locals.user as Teacher
    try {
        const upload_data: UploadAssignmentData = req.body;
        //reasign
        upload_data.title = upload_data.title?.trim() || null
        upload_data.description = upload_data.description?.trim() || null


        /* validations */
        

        //null validations
        if(!upload_data.title) return jsonResponse.clientError("Please provide a title");
        if(!upload_data.description) return jsonResponse.clientError("Please provide a description");
        if(!upload_data.due) return jsonResponse.clientError("Please provide a due date");
        if(!upload_data.points) return jsonResponse.clientError("Please provide points")
        if(upload_data.points < 1 && upload_data.points > 10)  return jsonResponse.clientError("Points should be greator than 0 but less than 11")
        if(upload_data.assigned_to.length === 0) return jsonResponse.clientError("Please assign a class")
        
        const assignment = new Assignments({
            ...upload_data,
            assigned_by: currentUser.user_id,
            assignment_id: makeId(),
            school_id: currentUser.school_id,
            assigned_class: upload_data.assigned_to,
            completed_by: [],
            redo_by: [],
            due: new Date(upload_data.due)
        });

        await assignment.save();
        jsonResponse.success(assignment.toJSON());
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}