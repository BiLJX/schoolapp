import { Assignment, AssignmentFeed, AssignmentStatus, UploadAssignmentData } from "@shared/Assignment";
import { Student, Teacher } from "@shared/User";
import moment from "moment";
import NotificationHandler from "../handler/notificationHandler";
import { AssignmentLog, Assignments } from "../models/Assignment";
import { Students } from "../models/Student";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";

export const getGivenAssignments: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser=  res.locals.user as Teacher;
    try {
        let assignments = await Assignments.find({
            school_id: currentUser.school_id,
            assigned_by: currentUser.user_id
        }).sort({createdAt: -1}).exec();
        assignments = assignments.map(x=>{
            x.given_on = moment(x.createdAt).format("MMMM Do YYYY");
            return x;
        })
        jsonResponse.success(await groupAssignment(assignments));
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getAssignmentById: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser = res.locals.user as Student | Teacher;
    const assignment_id = req.params.id
    try {
        if(!assignment_id) return jsonResponse.notFound("Assignment not found!");
        let assignment: Assignment;
        if(currentUser.type === "student"){
            assignment = (await Assignments.aggregate<Assignment>([
                {
                    $match: {
                        assigned_class: {
                            $in: [currentUser.class_id]
                        },
                        assignment_id
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
    
            ]))[0]
        }else{
            assignment = (await Assignments.aggregate<Assignment>([
                {
                    $match: {
                        assigned_by: currentUser.user_id,
                        assignment_id
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
    
            ]))[0]
        }
       
        if(currentUser.type === "student"){
            if(assignment.completed_by.includes(currentUser.user_id)) assignment.status = "completed";
            else if(assignment.redo_by.includes(currentUser.user_id)) assignment.status = "redo";
            else assignment.status = "pending";
        }
        if(!assignment) return jsonResponse.notFound("Assignment not found!");
        assignment.given_on = moment(assignment.createdAt).format("MMMM Do YYYY")
        jsonResponse.success(assignment)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    } 
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

export const getAssignedStudents: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { user_id, school_id } = res.locals.user;
    try {
        const assignment_id = req.params.id;
        const assignments = await Assignments.aggregate([
            {
                $match:{
                    assignment_id,
                    school_id,
                    assigned_by: user_id,
                }
            },
            {
                $lookup: {
                    from: "students",
                    as: "assigned_students",
                    let: {
                        clases: "$assigned_class",
                        completed_by: "$completed_by"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$in: ["$class_id", "$$clases"]},
                                        {$not: { $in: ["$user_id", "$$completed_by"] }}
                                    ]
                                   
                                }
                            }
                        },
                        {
                            $project: {
                                user_id: 1,
                                full_name: 1,
                                profile_picture_url: 1
                            }
                        }
                    ]
                }
            },
        ])
        let data = assignments[0]?.assigned_students;
        if(!data) return jsonResponse.notFound("Assignment Not Found.")
        data = data.map((x: any)=>{
            x.has_to_redo = assignments[0].redo_by.includes(x.user_id);
            return x;
        })
        jsonResponse.success(data);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}


export const createAssignment: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser = res.locals.user as Teacher;
    const notification = req.app.locals.notification as NotificationHandler;
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
        try {
            const users = await Students.find({class_id: {
                $in: assignment.assigned_class
            }})
            const receiver_ids = users.map(x=>x.user_id);
            receiver_ids.forEach(async x=>{
                try {
                    await notification.notify({
                        type: notification.Types.NEW_ASSIGNMENT,
                        receiver_id: x,
                        sender_id: currentUser.user_id,
                        content: null,
                        sender_data: {
                            full_name: currentUser.full_name,
                            profile_picture_url: currentUser.profile_picture_url,
                            type: "teacher"
                        },
                    })
                } catch (error) {
                    console.log(error);
                }
            })
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}
export const submitAssignment: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { user_id, school_id } = res.locals.user;
    try {
        const assignment_id = req.params.id;
        const student_id = req.body.student_id;
        if(!student_id) return jsonResponse.notFound("Student not found.");
        if(!assignment_id) return jsonResponse.notFound("Assignment Not Found.");
        const assignment = await Assignments.findOne({assignment_id, assigned_by: user_id});
        if(!assignment) return jsonResponse.notFound("Assignment Not Found.");
        if(assignment.completed_by.includes(student_id)) return jsonResponse.clientError("The student has already submitted");
        await assignment.updateOne({
            $push: {
                completed_by: student_id
            }
        })
        if(assignment.redo_by.includes(student_id)) await assignment.updateOne({$pull: {redo_by: student_id}});
        const total_points = calcAssignmentPoints(assignment);
        const log = new AssignmentLog({
            log_id: makeId(),
            log_type: "completed",
            school_id,
            assigned_by: user_id,
            assignment_id,
            log_of: student_id,
            points_gained: total_points
        })
        await log.save();
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const redoAssignment: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { user_id, school_id } = res.locals.user;
    try {
        const assignment_id = req.params.id;
        const student_id = req.body.student_id;
        if(!student_id) return jsonResponse.notFound("Student not found.");
        if(!assignment_id) return jsonResponse.notFound("Assignment Not Found.");
        const assignment = await Assignments.findOne({assignment_id, assigned_by: user_id});
        if(!assignment) return jsonResponse.notFound("Assignment Not Found.");
        if(assignment.redo_by.includes(student_id)) return jsonResponse.clientError("The student has already submitted");
        await assignment.updateOne({
            $push: {
                redo_by: student_id
            }
        })
        
        const log = new AssignmentLog({
            log_id: makeId(),
            log_type: "redo",
            school_id,
            assigned_by: user_id,
            assignment_id,
            log_of: student_id,
        })
        await log.save();
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getSubmittedStudents: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { school_id } = res.locals.user;
    try {
        const assignment_id = req.params.id;
        const assignment = (await Assignments.findOne({assignment_id, school_id}))?.toJSON();
        if(!assignment) return jsonResponse.clientError("Assignment not found");
        const submitted_students_id = assignment.completed_by;
        const submitted_students = await Students.find({user_id: { $in: submitted_students_id }}).select("user_id full_name profile_picture_url").exec();
        jsonResponse.success(submitted_students);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getPendingStudents: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { school_id } = res.locals.user;
    try {
        const assignment_id = req.params.id;
        const assignments = await Assignments.aggregate([
            {
                $match:{
                    assignment_id,
                    school_id,
                }
            },
            {
                $lookup: {
                    from: "students",
                    as: "assigned_students",
                    let: {
                        clases: "$assigned_class",
                        completed_by: "$completed_by"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$in: ["$class_id", "$$clases"]},
                                        {$not: { $in: ["$user_id", "$$completed_by"] }}
                                    ]
                                   
                                }
                            }
                        },
                        {
                            $project: {
                                user_id: 1,
                                full_name: 1,
                                profile_picture_url: 1
                            }
                        }
                    ]
                }
            },
        ])
        let students = assignments[0]?.assigned_students;
        if(!students) return jsonResponse.clientError("Assignment not found");
        students = students.filter((x: Student)=>!assignments[0].completed_by.includes(x.user_id));
        jsonResponse.success(students);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getRedoStudents: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { school_id } = res.locals.user;
    try {
        const assignment_id = req.params.id;
        const assignment = (await Assignments.findOne({assignment_id, school_id}))?.toJSON();
        if(!assignment) return jsonResponse.clientError("Assignment not found");
        const redo_students_id = assignment.redo_by;
        const redo_students = await Students.find({user_id: { $in: redo_students_id }}).select("user_id full_name profile_picture_url");
        jsonResponse.success(redo_students);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const deleteAssignment: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { user_id } = res.locals.user;
    try {
        const assignment_id = req.params.id;
        await Assignments.deleteOne({assigned_by: user_id, assignment_id});
        return jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

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

const calcAssignmentPoints = (assignment_obj: Assignment) => {
    const submitted_date = moment(new Date());
    const due_date = moment(assignment_obj.due);
    const created_date = moment(assignment_obj.createdAt);
    let submitted = submitted_date.diff(created_date, "days", false) - 1;
    if(submitted < 0) submitted = 0;
    const due = due_date.diff(created_date, "days", false) + 1;
    if(due < submitted) return 0;
    const points = assignment_obj.points;
    const decimal_points = points * ((due - submitted)/due);
    return Math.round(decimal_points);
}


