import axios from "axios";
import { GET_ERRORS } from "./UsersActions";

export const GET_POSTS = 'GET_POSTS';
export const SET_POSTS = 'SET_POSTS';

export const getPosts = (topic) => dispatch => {
    console.log(topic);
    axios.get(`http://localhost:4000/posts/${topic}`)
        .then((posts) => {
            dispatch(setPosts(posts.data));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.reponse.data
            })
        })
}

export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
})