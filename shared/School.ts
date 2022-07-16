export interface School {
    school_id: string
    name: string
    logo_url: string
    password: string
    total_students: number
}

export interface ClassSchema {
    class_id: string,
    school_id: string,
    grade: number,
    section: string,
    total_students: number
}