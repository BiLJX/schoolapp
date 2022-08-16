import { AssignmentLog } from "../models/Assignment";
import { Students } from "../models/Student";
import { Teachers } from "../models/Teacher";
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
    const currentUser = res.locals.user;
    try {
        const students = await Students.aggregate([
            {
                $match: {
                    school_id: currentUser.school_id,
                    student_verified: true,
                }
            },
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
                    completed_assignments_count: { $ifNull: ["$completed_assignments.count", 0] },
                    assignment_points: { $ifNull: ["$assignment_logs.total_points", 0]},
                    merits_count: { $ifNull: ["$merits.total_points", 0]},
                    demerits_count: { $ifNull: ["$demerits.total_points", 0]},
                }
            },
            {
                $addFields: {
                    merits_ratio: { $divide: ["$merits_count", {$add: ["$demerits_count", 1]}] },
                    merits_difference: { $subtract: ["$merits_count", "$demerits_count"] },
                    assignment_ratio: { $divide: ["$completed_assignments_count", {$add: ["$demerits_count", 1]}] }
                }
            },
            {
                $addFields: {
                    merits_score: { $multiply: ["$merits_difference", "$merits_ratio","$WEIGHTS.merits_difference"] },
                    assignment_score: { $multiply: ["$assignment_points", "$assignment_ratio", "$WEIGHTS.assignment_ratio"] },
                }
            },
            {
                $addFields: {
                    score: { $add: ["$assignment_score", "$merits_score"] },
                }
            },
            {
                $sort: {
                    score: -1
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

export const searchExplore: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { school_id } = res.locals.user;
        const searchQuery: string = req.query.s as string;
        if(!searchQuery) return jsonResponse.success([]);
        const studentQuery = Students.aggregate([
            {
                $match: {
                    full_name: {$regex : searchQuery, $options: 'i'},
                    school_id,
                    student_verified: true
                }
            },
            {
                $lookup: {
                    from: "interactions",
                    localField: "user_id",
                    foreignField: "given_to",
                    as: "merits_count",
                    pipeline: [
                        {
                            $match: {
                                type: "merit"
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "interactions",
                    localField: "user_id",
                    foreignField: "given_to",
                    as: "demerits_count",
                    pipeline: [
                        {
                            $match: {
                                type: "demerit"
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "class_id",
                    foreignField: "class_id",
                    as: "class",
                    pipeline: [
                        {
                            $project: {
                                section: 1,
                                grade: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$school",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$class",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    merits_count: {
                        $size: "$merits_count"
                    },
                    demerits_count: {
                        $size: "$demerits_count"
                    },
                    type: "student"
                }
            },
            {
                $project: {
                    merits_count: 1,
                    demerits_count: 1,
                    profile_picture_url: 1,
                    full_name: 1,
                    school: 1,
                    class: 1,
                    user_id: 1,
                    type: 1
                }
            }
        ])
        const teacherQuery = Teachers.aggregate([
            {
                $match: {
                    full_name: { $regex: searchQuery, $options: 'i' },
                    school_id,
                    teacher_verified: true
                }
            },
            {
                $addFields: {
                    type: "teacher"
                }
            },
            {
                $project: {
                    profile_picture_url: 1,
                    full_name: 1,
                    school: 1,
                    user_id: 1,
                    type: 1
                }
            }
        ])
        const [students, teacher] = await Promise.all([studentQuery, teacherQuery])
        jsonResponse.success([...students, ...teacher]);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}