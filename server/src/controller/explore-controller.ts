import { AssignmentLog } from "../models/Assignment";
import { Students } from "../models/Student";
import { Controller } from "../types/controller";
import JsonResponse from "../utils/Response";

const WEIGHTS = {
    assignment_ratio: 1,
    assignment_points: 0.5,
    merits_ratio: 0.25,
    merits_difference: 0.5
}

export const getTopStudents: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const students = await Students.aggregate([
            {
                $lookup: {
                    from: "assignment_logs",
                    as: "assignment_logs",
                    foreignField: "log_of",
                    localField: "user_id",
                    pipeline: [
                        {
                            $group: {
                                _id: "$log_of",
                                total_points: { $sum: "$points_gained" }
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "interactions",
                    as: "merits",
                    localField: "user_id",
                    foreignField: "given_to",
                    pipeline: [
                        {
                            $match: {
                                type: "merit"
                            }
                        },
                        {
                            $group: {
                                _id: "$given_to",
                                total_points: { $sum: "$amount" }
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "interactions",
                    as: "demerits",
                    localField: "user_id",
                    foreignField: "given_to",
                    pipeline: [
                        {
                            $match: {
                                type: "demerit"
                            }
                        },
                        {
                            $group: {
                                _id: "$given_to",
                                total_points: { $sum: "$amount" }
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "assignments",
                    as: "given_assignments",
                    let: {
                        class_id: "$class_id",
                        user_id: "$user_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$in: ["$$class_id", "$assigned_class"]},
                                    ]
                                    
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $count: {} }
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "assignments",
                    as: "completed_assignments",
                    let: {
                        class_id: "$class_id",
                        user_id: "$user_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$in: ["$$class_id", "$assigned_class"]},
                                        {$in: ["$$user_id", "$completed_by"]}
                                    ]
                                    
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $count: {} }
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$merits",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$demerits",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$assignment_logs",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$given_assignments",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$completed_assignments",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    WEIGHTS: WEIGHTS,
                    given_assignments_count: {$add: [{$ifNull: ["$given_assignments.count", 0]}, 1]},
                    completed_assignments_count: { $ifNull: ["$completed_assignments.count", 0] }
                }
            },
            {
                $addFields: {
                    merits_ratio: { $divide: ["$merits.total_points", "$demerits.total_points"] },
                    merits_difference: { $subtract: ["$merits.total_points", "$demerits.total_points"] },
                    assignment_ratio: { $divide: ["$completed_assignments_count", "$given_assignments_count"] }
                }
            },
            {
                $addFields: {
                    merits_ratio_score: { $multiply: ["$merits_ratio", "$WEIGHTS.merits_ratio"] },
                    merits_difference_score: { $multiply: ["$merits_difference", "$WEIGHTS.merits_difference"] },
                    assignment_score: { $multiply: ["$assignment_logs.total_points", "$assignment_ratio"] },
                }
            },
            {
                $addFields: {
                    score: { $add: ["$assignment_score", "$merits_ratio_score", "$merits_difference_score"] },
                }
            },
            {
                $sort: {
                    score: -1
                }
            },
            {
                $addFields: {
                    assignment_points: "$assignment_logs.total_points",
                    merits_count: "$merits.total_points",
                    demerits_count: "$demerits.total_points",
                }
            },
            {
                $project: {
                    full_name: 1,
                    profile_picture_url: 1,
                    user_id: 1,
                    merits_count: 1,
                    demerits_count: 1,
                    assignment_points: 1
                }
            },
            
        ])
        jsonResponse.success(students)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}