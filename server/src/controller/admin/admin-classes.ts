import { School } from "@shared/School";
import { Request, Response } from "express";
import { Class } from "../../models/Class";
import { makeId } from "../../utils/idgen";
import JsonResponse from "../../utils/Response";
import admin from "firebase-admin";
import { Controller } from "../../types/controller";
import { Students } from "../../models/Student";

export const getCurrentAdmin = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res)
    try {
        const admin: School = res.locals.admin;
        jsonResponse.success(admin)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getClassById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const class_id = req.params.class_id;
    try {
        if(!class_id) return jsonResponse.clientError("Id not provided");
        const class_data = await Class.aggregate([
            {
                $match: {
                    class_id
                }
            },
            {
                $lookup: {
                    from: "students",
                    as: "males",
                    foreignField: "class_id",
                    localField: "class_id",
                    pipeline: [
                        {
                            $match: {
                                gender: "Male"
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "students",
                    as: "females",
                    foreignField: "class_id",
                    localField: "class_id",
                    pipeline: [
                        {
                            $match: {
                                gender: "Female"
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    total_students: {
                        $add: [{$size: "$males"}, {$size: "$females"}]
                    },
                    total_males: { $size: "$males" },
                    total_females: { $size: "$females" },
                }
            },
        ])
        if(!class_data[0]) return jsonResponse.notFound("Class not found.");
        jsonResponse.success(class_data[0]);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getClasses = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const admin: School = res.locals.admin;
        const classes = await Class.aggregate([
            {
                $match: {
                    school_id: admin.school_id
                }
            },
           
            {
                $sort: {
                    grade: 1
                }
            },
            {
                $lookup: {
                    from: "students",
                    as: "students",
                    foreignField: "class_id",
                    localField: "class_id"
                }
            },
            {
                $addFields: {
                    total_students: {
                        $size: "$students"
                    }
                }
            },
            {
                $project: {
                    students: 0
                }
            }
        ]);
        return jsonResponse.success(classes);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getClassStudents: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const class_id = req.params.class_id as string|undefined;
    try {
        if(!class_id) return jsonResponse.clientError("No class id provided");
        const students = await Students.find({class_id, student_verified: true}).select("user_id profile_picture_url full_name")
        return jsonResponse.success(students)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const editClass: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { grade, section }: { grade: number, section: string } = req.body;
    const class_id = req.body.class_id;
    try {
        if( typeof grade !== "number" ) return jsonResponse.clientError("Classes must be a number");
        const admin: School = res.locals.admin;
        await Class.findOneAndUpdate({
            class_id,
            school_id: admin.school_id,
            grade,
            section
        })
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const addClasses = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res);
    const { grade, section }: { grade: number, section: string } = req.body;
    try {
        if( typeof grade !== "number" ) return jsonResponse.clientError("Classes must be a number");
        const admin: School = res.locals.admin;
        const _class = new Class({
            class_id: makeId(),
            school_id: admin.school_id,
            grade,
            section
        })
        await _class.save();
        jsonResponse.success(_class.toJSON(), "successfully created new class");
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const removeClass = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res);
    const class_id = req.params.class_id
    try {
        await Class.findOneAndDelete({class_id});
        jsonResponse.success({}, "successfully removed class")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}



