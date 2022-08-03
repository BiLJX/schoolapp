"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceAggregation = exports.studentAggregation = void 0;
var moment_1 = __importDefault(require("moment"));
var studentAggregation = function (match) {
    return [
        match,
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
            $lookup: {
                from: "classes",
                localField: "class_id",
                foreignField: "class_id",
                as: "class",
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
            }
        }
    ];
};
exports.studentAggregation = studentAggregation;
var performanceAggregation = function (filter, period) {
    var date = new Date();
    switch (period) {
        case "WEEK":
            return [
                { $match: filter },
                {
                    $match: {
                        createdAt: {
                            $gte: moment_1.default().startOf('isoWeek').toDate(),
                            $lt: moment_1.default().endOf('isoWeek').toDate()
                        }
                    }
                },
            ];
        case "MONTH":
            var month = date.getMonth() + 1;
            return [
                { $match: filter },
                {
                    $addFields: {
                        month: { $month: "$given_on" }
                    }
                },
                {
                    $match: { month: month }
                },
            ];
        case "YEAR":
            var year = date.getFullYear();
            return [
                { $match: filter },
                {
                    $addFields: {
                        year: { $year: "$given_on" }
                    }
                },
                {
                    $match: { year: year }
                },
            ];
        default:
            throw new Error("Invalid time period");
    }
};
exports.performanceAggregation = performanceAggregation;
