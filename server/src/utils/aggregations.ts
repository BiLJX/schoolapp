export const studentAggregation = (match: any) => {
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
    ]
}