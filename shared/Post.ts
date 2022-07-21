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
    createdAt: string
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

