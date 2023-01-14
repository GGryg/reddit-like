import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";

const RootReducer = combineReducers({
    errors: ErrorReducer,
    auth: AuthReducer,
});

export default RootReducer;