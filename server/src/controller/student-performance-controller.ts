import { Request, Response } from "express";
import { StudentPerformanceData, StudentPerformanceOverall, TimePeriods } from "@shared/Student-Performance"
import { Interactions } from "../models/Interaction";
import { Students } from "../models/Student";
import { Teachers } from "../models/Teacher";
import { Controller } from "../types/controller";
import { performanceAggregation, studentAggregation } from "../utils/aggregations";
import JsonResponse from "../utils/Response"
import moment from "moment";
import { AssignmentLog, Assignments } from "../models/Assignment";

export const getStudentMeritsPerformance: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const periods: TimePeriods[] = ["WEEK", "MONTH", "YEAR"]
        const time_period: TimePeriods = req.query.time_period as TimePeriods;
        if(!periods.includes(time_period)) return jsonResponse.clientError("Invalid time period");
        const user_id = req.params.user_id;
        const agg: any = performanceAggregation({given_to: user_id,type: "merit"}, time_period);
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
            {
                $sort: { _id: 1 }
            }
        ]);
        let performance_data: StudentPerformanceData;
        switch(time_period){
            case "WEEK":
                performance_data = {
                    name: "Merits Obtained in",
                    labels: merits.map(x=>`${x._id}`),
                    data: merits.map(x=>x.total)
                }
                break;
            case "MONTH":
                performance_data = {
                    name: "Merits Obtained in",
                    labels: merits.map(x=>`${moment(new Date()).format("MMM")} ${x._id}`),
                    data: merits.map(x=>x.total)
                }
                break;
            case "YEAR":
                performance_data = {
                    name: "Merits Obtained in",
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

export const getStudentDemeritsPerformance: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const periods: TimePeriods[] = ["WEEK", "MONTH", "YEAR"]
        const time_period: TimePeriods = req.query.time_period as TimePeriods;
        if(!periods.includes(time_period)) return jsonResponse.clientError("Invalid time period");
        const user_id = req.params.user_id;
        const agg: any = performanceAggregation({given_to: user_id,type: "demerit"}, time_period);
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
        const demerits = await Interactions.aggregate<{_id: number, total: number}>([
            ...agg,
            {...group},
            {
                $sort: { _id: 1 }
            }
        ]);
        let performance_data: StudentPerformanceData;
        switch(time_period){
            case "WEEK":
                performance_data = {
                    name: "Demerits Obtained in",
                    labels: demerits.map(x=>`${x._id}`),
                    data: demerits.map(x=>x.total)
                }
                break;
            case "MONTH":
                performance_data = {
                    name: "Demerits Obtained in",
                    labels: demerits.map(x=>`${moment(new Date()).format("MMM")} ${x._id}`),
                    data: demerits.map(x=>x.total)
                }
                break;
            case "YEAR":
                performance_data = {
                    name: "Demerits Obtained in",
                    labels: demerits.map(x=>`${moment(x._id, "M").format("MMM")}`),
                    data: demerits.map(x=>x.total)
                }
                break;
        }
        jsonResponse.success(performance_data)
    } catch (error) {
        console.log(error)
        jsonResponse.serverError()
    }
}

export const getStudentMDOverall: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const user_id: string = req.params.user_id
        const total_interactions = await Interactions.find({given_to: user_id}).lean();
        let merits_sum = 0;
        let demerits_sum = 0;
        for(let x of total_interactions){
            if(x.type === "merit") merits_sum += x.amount;
            else demerits_sum += x.amount;
        };
        if(demerits_sum === 0) demerits_sum = 1;
        const ratio = (merits_sum/demerits_sum).toFixed(2);
        const difference = merits_sum-demerits_sum;
        return jsonResponse.success({ratio, difference});
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getStudentsAssignmentPerformance: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const user_id: string = req.params.user_id;
        const student = await Students.findOne({user_id});
        if(!student) return jsonResponse.clientError("student not found: (");
        const assignments = await Assignments.find({assigned_class: {$in: [student.class_id]}}).lean();
        if(!assignments) return jsonResponse.clientError("No assignments found");
        const assignment_logs = await AssignmentLog.find({log_of: user_id, type: "completed"});
        const completed_assignments = assignments.filter(x=>x.completed_by.includes(user_id));
        const pending_assignments = assignments.filter(x=>!x.completed_by.includes(user_id));
        const assignment_ratio = completed_assignments.length / assignments.length;
        const total_assignment_points = assignment_logs.reduce((points, assignment)=>assignment.points_gained + points, 0);
        const data: StudentPerformanceOverall[] = [
            {
                label: "Given Assignments",
                value: assignments.length
            },
            {
                label: "Pending Assignments",
                value: pending_assignments.length
            },
            {
                label: "Completed Assignments",
                value: completed_assignments.length
            },
            {
                label: "Completed to Given Ratio",
                value: assignment_ratio.toFixed(2)
            },
            {
                label: "Assignment Points",
                value: total_assignment_points
            }
        ]
        return jsonResponse.success(data);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}