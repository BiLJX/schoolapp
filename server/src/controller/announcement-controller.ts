import { Announcement, AnnouncementClientData, AnnouncementFeed } from "@shared/Announcement";
import moment from "moment";
import { Announcements } from "../models/Announcement";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";

export const createAnnouncement: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin = res.locals.admin;
    try {
        const data: AnnouncementClientData = req.body;
        data.body = data.body.trim();
        data.title = data.title.trim();
        const announcement = new Announcements({
            announcement_id: makeId(),
            school_id: admin.school_id,
            title: data.title.trim(),
            body: data.body.trim(),
            is_announced_to_students: data.is_announced_to_students,
            is_announced_to_teachers: data.is_announced_to_teachers,
            read_by: []
        })
        await announcement.save();
        jsonResponse.success(announcement)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getAnnouncements: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser = res.locals.user;
    try {
        let announcements = await Announcements.aggregate<{given_on: string} & Announcement>([
            {
                $match: {
                    school_id: currentUser.school_id
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $addFields: {
                    has_read: {
                        $in: [currentUser.user_id, "$read_by"]
                    }
                }
            }
        ])
        announcements = announcements.map(x=>{
            x.given_on = moment(x.createdAt).format("Do MMMM YYYY")
            return x;
        });
        jsonResponse.success(await groupAnnouncement(announcements));
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

const groupAnnouncement = async (announcements: {given_on: string}[] & Announcement[]) => {
    let map: Record<string,  {given_on: string}[] & Announcement[]> = {};
    for(let announcement of announcements){
        if(!map[announcement.given_on]){
            map[announcement.given_on] = announcements.filter(x=>x.given_on === announcement.given_on) as {given_on: string}[] & Announcement[]
        }
    }
    const data: AnnouncementFeed[] = Object.keys(map).map(x=>{
        return {
            given_on: x,
            items: map[x]
        }
    })
    return data;
}