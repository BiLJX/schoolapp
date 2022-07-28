import { Request, Response } from "express";
import { StudentPerformanceData, TimePeriods } from "@shared/Student-Performance"
import { Interactions } from "../models/Interaction";
import { Students } from "../models/Student";
import { Teachers } from "../models/Teacher";
import { Controller } from "../types/controller";
import { performanceAggregation, studentAggregation } from "../utils/aggregations";
import JsonResponse from "../utils/Response"
import moment from "moment";

export const getCurrentUser = (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const user = res.locals.user;
        jsonResponse.success(user);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getStudentById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const user_id = req.params.user_id;
        const users = await Students.aggregate(studentAggregation({ $match: {
            user_id
        } }));
        const user = users[0];
        if(user) {
            user.type = "student";
            return jsonResponse.success(user);
        }
        jsonResponse.notFound("Student not found.")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getTeacherById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const user_id = req.params.user_id;
        const users = await Teachers.aggregate([
            {
                $match: {
                    user_id
                }
            },
            {
                $lookup: {
                    from: "schools",
                    localField: "school_id",
                    foreignField: "school_id",
                    as: "school",
                    pipeline: [
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$school"
                }
            },
        ]);
        const user = users[0];
        if(user) {
            user.type = "teacher";
            return jsonResponse.success(user);
        }
        jsonResponse.notFound("Teacher not found.")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getStudentPerformance: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const periods: TimePeriods[] = ["WEEK", "MONTH", "YEAR"]
        const time_period: TimePeriods = req.query.time_period as TimePeriods;
        if(!periods.includes(time_period)) return jsonResponse.clientError("Invalid time period");
        const user_id = req.params.user_id;
        const agg: any = performanceAggregation({given_to: user_id,type: "merit"}, "YEAR");
        let group = time_period === "YEAR"?({
            $group: {
                _id: { $month: "$given_on"},
                total: { $sum: "$amount" }
            }
        }):({
            $group: {
                _id: { $dayOfMonth: "$given_on"},
                total: { $sum: "$amount" }
            }
        })
        const merits = await Interactions.aggregate<{_id: number, total: number}>([
            ...agg,
            {...group},
        ]);
        let performance_data: StudentPerformanceData;
        switch(time_period){
            case "WEEK":
                performance_data = {
                    name: "Total Merits",
                    labels: merits.map(x=>`${x._id}`),
                    data: merits.map(x=>x.total)
                }
                break;
            case "MONTH":
                performance_data = {
                    name: "Total Merits",
                    labels: merits.map(x=>`${moment(new Date()).format("MMM")} ${x._id}`),
                    data: merits.map(x=>x.total)
                }
                break;
            case "YEAR":
                performance_data = {
                    name: "Total Merits",
                    labels: merits.map(x=>`${moment(x._id, "M").format("MMM")}`),
                    data: merits.map(x=>x.total)
                }
                break;
        }
        jsonResponse.success(performance_data)
    } catch (error) {
        console.log(error)
        jsonResponse.serverError()
    }
}