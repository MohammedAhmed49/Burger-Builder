import * as actionTypes from '../actions/actionTypes';

const initState = {
    orders: [],
    loading: false,
    purchased: false
}

export const orderReducer = (state = initState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }

            return{
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }

        case actionTypes.PURCHASE_FAILED:
            return { 
                ...state,
                loading: false
             }
        
        case actionTypes.PURCHASE_START:
            return { 
                ...state,
                loading: true
            }

        default:
            return state
    }
}