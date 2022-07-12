export interface School {
    school_id: string
    name: string
    logo_url: string
    password: string
    total_students: number
}

export interface Class {
    grade: number,
    section: string,
    school_id: string,
    class_id: string
}