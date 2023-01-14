import axios from "axios";

export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const registerUser = (user) => dispatch => {
    axios.post('http://localhost:4000/users/register', user)
        .then(res => console.log(res))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data,
            });
        });
};

export const checkEmail = (email) => dispatch => {
    axios.get('http://localhost:4000/users/email/' + email)
        .then(res => console.log(res))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data,
            });
        });
};

export const checkUsername = (username) => dispatch => {
    axios.get('http://localhost:4000/users/name/' + username)
        .then(res => console.log(res))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data,
            });
        });
};