type AnnouncedTo = "teacher"|"student"

export interface Announcement {
    announcement_id: string,
    school_id: string,
    title: string,
    body: string,
    read_by: string[],
    is_announced_to_teachers: boolean,
    is_announced_to_students: boolean,
    has_read: boolean,
    createdAt: string
}

export interface AnnouncementClientData {
    title: string,
    body: string,
    is_announced_to_teachers: boolean,
    is_announced_to_students: boolean
}

export interface AnnouncementFeed {
    given_on: string,
    items: Announcement[]
}