import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const initIngredients = () => {
    return dispatch => {
        Axios.get('/ingredients.json')
        .then(res => {
            dispatch({type: actionTypes.INIT_INGREDIENTS, ingredients: res.data});
        })
        .catch(error => {
            dispatch({type: actionTypes.SET_ERROR, error: error});
        });
    }
}