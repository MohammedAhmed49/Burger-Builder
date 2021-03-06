import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICES = {
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.0,
    salad: 0.5
}

const initialState = {
    ingredients: null,
    totalPrice: 3,
    error: false,
    started: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                started: true
            }
        
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                started: true
            }
        case actionTypes.INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 3,
                error: false,
                started: false
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;