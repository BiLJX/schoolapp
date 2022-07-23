import { Post } from "@shared/Post";
import { FeedActionTypes } from "./feedTypes";

export function addFeed(posts: Post[]): Action<FeedActionTypes, Post[]> {
    return {
        type: FeedActionTypes.ADD_FEED,
        payload: posts
    }
}

export function likePostAction(post_id: string): Action<FeedActionTypes, string> {
    return {
        type: FeedActionTypes.LIKE_POST,
        payload: post_id
    }
}

export function unlikePostAction(post_id: string): Action<FeedActionTypes, string> {
    return {
        type: FeedActionTypes.UNLIKE_POST,
        payload: post_id
    }
}

export function deletePostAction(post_id: string): Action<FeedActionTypes, string> {
    return {
        type: FeedActionTypes.DELETE_POST,
        payload: post_id
    }
}