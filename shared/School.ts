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

export interface ClassInfo extends ClassSchema {
    total_males: number,
    total_females: number
}

export interface DashboardData {
    total_students: number,
    total_teachers: number,
    total_classes: number
    gender_stats: {
        male_students: number,
        female_students: number
    }
}