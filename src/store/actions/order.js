import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

const purchaseSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
}

const purchaseFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_FAILED,
        error: error
    }
}

const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    }
}

export const purchase = (orderData) => {
    return dispatch => {
        dispatch(purchaseStart());
        Axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseFailed(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}