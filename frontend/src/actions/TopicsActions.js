import axios from "axios";
import { GET_ERRORS } from "./UsersActions";

export const SET_TOPICS = 'SET_TOPICS';
export const LOAD_TOPICS = 'LOAD_TOPICS';

export const getTopics = () => dispatch => {
    dispatch({
        type: LOAD_TOPICS,
        loading: true,
    })
    axios.get('http://localhost:4000/topics')
        .then((topics) => {
            dispatch(setTopics(topics.data));
            dispatch({
                type: LOAD_TOPICS,
                loading: false,
            });
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
});

export const createTopic = (topic) => dispatch => {
    axios.post('http://localhost:4000/topics/create')
        .then(() => null)
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                errors: err.response.data,
            });
        });
};