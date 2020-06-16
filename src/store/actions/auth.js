import * as actionTypes from './actionTypes';
import Axios from 'axios';

const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (idToken, userId) => {
    return { 
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
     }
}

const authFailed = (error) => {
    return { 
        type: actionTypes.AUTH_FAILED,
        error: error
     }
}

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkLogout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expiresIn * 1000);
    }
}

export const authInit = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const url = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCd70anRS0wxNYWhektqLtHzTAe406lGiw' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCd70anRS0wxNYWhektqLtHzTAe406lGiw';
        console.log(isSignup, url);
        Axios.post(url, data)
        .then(res => {
            console.log(res.data);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkLogout(res.data.expiresIn));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFailed(error.response.data.error.message));
        });
    }
}

export const setAuthRedirect = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}