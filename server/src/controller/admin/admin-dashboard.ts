import { ClassSchema, DashboardData } from "@shared/School";
import { Student, Teacher } from "@shared/User";
import { Announcements } from "../../models/Announcement";
import { Schools } from "../../models/School";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";

export const getDashboard: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const school = res.locals.admin;
    try {
        interface AggregatedData {
            students: Student[],
            teachers: Teacher[],
            classes: ClassSchema[],
        }
        const raw_data = await Schools.aggregate<AggregatedData>([
            {
                $match: {
                    school_id: school.school_id
                }
            },
            {
                $lookup: {
                    from: "students",
                    as: "students",
                    localField: "school_id",
                    foreignField: "school_id"
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    as: "teachers",
                    localField: "school_id",
                    foreignField: "school_id"
                }
            },
            {
                $lookup: {
                    from: "classes",
                    as: "classes",
                    localField: "school_id",
                    foreignField: "school_id"
                }
            },
        ]);
        const x = raw_data[0];
        const data: DashboardData = {
            total_students: x.students.length,
            total_teachers: x.teachers.length,
            total_classes: x.classes.length,
            gender_stats: {
                male_students: x.students.filter(x=>x.gender === "Male").length,
                female_students: x.students.filter(x=>x.gender === "Female").length
            }
        }
        jsonResponse.success(data);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getAdminNotices: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const school = res.locals.admin;
    try {
        const announcements = await Announcements.find({school_id: school.school_id}).sort({"createdAt": -1});
        jsonResponse.success(announcements)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const deleteNotice: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const school = res.locals.admin;
    try {
        const notice_id = req.params.id;
        await Announcements.findOneAndDelete({school_id: school.school_id, announcement_id: notice_id});
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}