import axios from "axios";
import { GET_ERRORS } from "./UsersActions";

export const SET_TOPICS = 'SET_TOPICS';

export const getTopics = () => dispatch => {
    axios.get('http://localhost:4000/topics')
        .then((topics) => {
            dispatch(setTopics(topics.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                errors: err.response.data
            });
        });
};

export const setTopics = (topics) => ({
    type: SET_TOPICS,
    topics
})