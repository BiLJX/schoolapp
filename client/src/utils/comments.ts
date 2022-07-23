import { Comment } from "@shared/Post";

export function getMappedComments(comments: Comment[], parent_id: string|null){
    const node: Comment[] = [];
    comments
    .filter(c=>c.parent_id === parent_id)
    .forEach(c=>{
        const _c = c;
        _c.children = getMappedComments(comments, c.comment_id);
        return node.push(_c)
    })
    return node;
}