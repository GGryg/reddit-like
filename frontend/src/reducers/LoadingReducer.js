import { LOAD_TOPICS } from "../actions/TopicsActions";

const initialState = true;

const LoadingReducer = (state=initialState, action) => {
    switch(action.type){
        case LOAD_TOPICS:
            return action.loading;
        default:
            return state;
    }
};

export default LoadingReducer;