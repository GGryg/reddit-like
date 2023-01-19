import { LOAD_POSTS } from "../actions/PostsActions";
import { LOAD_TOPICS } from "../actions/TopicsActions";

const initialState = {
    topic: true,
    posts: true
};

const LoadingReducer = (state=initialState, action) => {
    switch(action.type){
        case LOAD_TOPICS:
            return {...state, topic: action.loading};
        case LOAD_POSTS:
            return {...state, posts: action.loading};
        default:
            return state;
    }
};

export default LoadingReducer;