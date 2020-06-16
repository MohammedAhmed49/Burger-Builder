import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return { 
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                loading: false
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                userId: null,
            }
        case actionTypes.SET_AUTH_REDIRECT:
            return{
                ...state,
                authRedirect: action.path
            }
        default:
            return state
    }
}

export default reducer;