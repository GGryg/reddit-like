import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";
import PostsReducer from "./PostsReducer";

const RootReducer = combineReducers({
    errors: ErrorReducer,
    auth: AuthReducer,
    posts: PostsReducer,
});

export default RootReducer;