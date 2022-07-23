import { Post } from "@shared/Post";
import { FeedActionTypes } from "./feedTypes";

export default function feedReducer(state: Post[] = [], action: Action<FeedActionTypes, Post[]|string>): Post[]{
    switch(action.type){
        case FeedActionTypes.ADD_FEED:
            return action.payload as Post[]
        case FeedActionTypes.LIKE_POST:
            var post_id = action.payload as string
            var post = state.find(x=>x.post_id === post_id);
            if(!post) return state;
            var index = state.findIndex(x=>x.post_id === post_id)
            post.has_liked = true;
            post.like_count += 1;
            var posts = [...state];
            posts[index] = post;
            return posts;
        case FeedActionTypes.UNLIKE_POST:
            post_id = action.payload as string
            post = state.find(x=>x.post_id === post_id);
            if(!post) return state;
            index = state.findIndex(x=>x.post_id === post_id)
            post.has_liked = false;
            post.like_count -= 1;
            posts = [...state];
            posts[index] = post;
            return posts;
        case FeedActionTypes.DELETE_POST:
            post_id = action.payload as string
            index = state.findIndex(x=>x.post_id === post_id);
            if(index <= -1) return state;
            posts = [...state];
            posts.splice(index, 1);
            return posts;
        default:
            return state
    }
}