import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";
import LoadingReducer from "./LoadingReducer";
import PostsReducer from "./PostsReducer";
import TopicsReducer from "./TopicsReducer";

const RootReducer = combineReducers({
    errors: ErrorReducer,
    auth: AuthReducer,
    loading: LoadingReducer,
    topics: TopicsReducer,
    posts: PostsReducer,
});

export default RootReducer;