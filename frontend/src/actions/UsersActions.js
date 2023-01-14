import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from './../SetAuthToken';

export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const registerUser = (user) => dispatch => {
    axios.post('http://localhost:4000/users/register', user)
        .then(res => console.log(res.data))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data,
            });
        });
};

export const checkEmail = (email) => dispatch => {
    axios.get('http://localhost:4000/users/email/' + email)
        .then(res => console.log(res.data))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data,
            });
        });
};

export const checkUsername = (username) => dispatch => {
    axios.get('http://localhost:4000/users/name/' + username)
        .then(res => console.log(res.data))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data,
            });
        });
};

export const loginUser = (user) => dispatch => {
    axios.post('http://localhost:4000/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data
            });
        });
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}