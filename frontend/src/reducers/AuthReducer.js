import { SET_CURRENT_USER } from "../actions/UsersActions";

const initialState = {
    isAuthenticated: false,
    user: {},
};

const AuthReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: action.payload === {},
                user: action.payload,
            };
        default:
            return state;
    };
};

export default AuthReducer;