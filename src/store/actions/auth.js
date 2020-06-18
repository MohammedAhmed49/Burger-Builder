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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireDate');
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
        Axios.post(url, data)
        .then(res => {
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expireDate', new Date(new Date().getTime() + res.data.expiresIn * 1000));
            localStorage.setItem('userId', res.data.localId);

            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkLogout(res.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error.message));
        });
    }
}

export const checkAuthLocal = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expireDate = new Date(localStorage.getItem('expireDate'));
        const userId = localStorage.getItem('userId');
        if(!token){
            dispatch(logOut());
        } else {
            if(expireDate > new Date()){
                dispatch(authSuccess(token, userId));
                dispatch(checkLogout((expireDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logOut());
            }
        }
    }
}


export const setAuthRedirect = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}