import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

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
    return (dispatch, getState) => {
        dispatch(purchaseStart());
        Axios.post('/orders.json?auth=' + getState().auth.idToken, orderData)
        .then(response => {
            dispatch(purchaseSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseFailed(error));
        });
    }
}

const ordersSuccess = (orders) => {
    return { 
        type: actionTypes.ORDERS_SUCCESS,
        orders: orders
    }
}

const orderFailed = (error) => {
    return { 
        type: actionTypes.ORDERS_FAILED,
        error: error
    }
}

const ordersStart = () => {
    return {
        type: actionTypes.ORDERS_START
    }
}

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(ordersStart());
        Axios.get('/orders.json?auth=' + getState().auth.idToken)
        .then(res=> {
            dispatch(ordersSuccess(res.data));
        })
        .catch(error => {
            dispatch(orderFailed(error));
        });
    }
}


