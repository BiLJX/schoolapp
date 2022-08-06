import { Assignment, AssignmentFeed, AssignmentStatus, UploadAssignmentData } from "@shared/Assignment";
import { Student, Teacher } from "@shared/User";
import moment from "moment";
import { Assignments } from "../models/Assignment";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";

const groupAssignment = async(assignments: Assignment[]) => {
    let map: Record<string, Assignment[]> = {};
    for(let assignment of assignments){
        if(!map[assignment.given_on]){
            map[assignment.given_on] = assignments.filter(x=>x.given_on === assignment.given_on);
        }
    }
    const data: AssignmentFeed[] = Object.keys(map).map(x=>{
        return {
            given_on: x,
            assignments: map[x]
        }
    })
    return data
}

export const getStudentsAssignment: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser = res.locals.user as Student; 
    try {
        const status = req.query.status as AssignmentStatus|"all";
        if(currentUser.type !== "student") return jsonResponse.notAuthorized();
        let assignments = await Assignments.aggregate<Assignment>([
            {
                $match: {
                    assigned_class: {
                        $in: [currentUser.class_id]
                    }
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    as: "author_data",
                    foreignField: "user_id",
                    localField: "assigned_by",
                    pipeline: [
                        {
                            $project: {
                                profile_picture_url: 1,
                                full_name: 1
                            }
                        }
                    ]
                }
            },

        ])
        assignments = assignments.map(x=>{
            if(x.completed_by.includes(currentUser.user_id)) x.status = "completed";
            else if(x.redo_by.includes(currentUser.user_id)) x.status = "redo";
            else x.status = "pending";
            x.given_on = moment(x.createdAt).format("MMMM Do YYYY")
            return x
        }).filter(x=>{
            if(status === "all") return true;
            return x.status === status;
        })
        jsonResponse.success(await groupAssignment(assignments))
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

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
            assigned_class: upload_data.assigned_to.map(x=>x.class_id),
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