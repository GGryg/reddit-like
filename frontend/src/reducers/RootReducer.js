import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer";

const RootReducer = combineReducers({
    errors: ErrorReducer,
});

export default RootReducer;