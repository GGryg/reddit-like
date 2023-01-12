import { GET_ERRORS } from "../actions/UsersActions";

const initialState = {};

const ErrorReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
};

export default ErrorReducer;