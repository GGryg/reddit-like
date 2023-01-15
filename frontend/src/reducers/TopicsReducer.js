import { SET_TOPICS } from "../actions/TopicsActions";

const initialState = [];

const TopicsReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_TOPICS:
            return action.topics;
        default:
            return state;
    };
};

export default TopicsReducer;