import { SET_POSTS } from "../actions/PostsActions";

const initialState = [];

const PostsReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_POSTS:
            return action.posts;
        default:
            return state;
    }
}

export default PostsReducer;