export interface Post {
    post_type: "text"|"image",
    post_id: string,
    school_id: string,
    author_id: string,
    title: string,
    body: string,
    content_src: string,
    liked_by: string[],
    like_count: number,
    comment_count: number,
    category: string,
    createdAt: string,
    has_liked: boolean,
    author_data: {
        profile_picture_url: string,
        full_name: string
    }
}

interface ClientPostData {
    title: string,
    category: string
}

export interface ClientPostDataText extends ClientPostData{
    post_type: "text",
    body: string
}

export interface ClientPostDataImage extends ClientPostData{
    post_type: "image",
    picture: string,
}

export interface Comment {
    parent_id: string|null,
    comment_id: string,
    author_id: string,
    post_id: string,
    text: string,
    children: Comment[]|null,
    author_data: {
        user_id: string,
        full_name: string,
        user_type: "student"|"teacher",
        profile_picture_url: string
    },
    createdAt: string,
    likes: string[],
    likes_count: number
}
