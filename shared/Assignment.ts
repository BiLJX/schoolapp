export interface UploadAssignmentData {
    title: string|null,
    description: string|null,
    due: string|null,
    points: number|null, 
    assigned_to: string[]
}


export interface Assignment {
    assignment_id: string,
    school_id: string,
    assigned_by: string,
    title: string,
    description: string,
    due: Date,
    assigned_class: string[],
    assigned_students: string[],
    completed_by: string[],
    redo_by: string[],
    points: number,
    author_data: {
        profile_picture_url: string,
        full_name: string,
    }
    createdAt: Date,
}