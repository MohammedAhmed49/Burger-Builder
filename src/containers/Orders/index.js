import React, { Component } from "react";
import Order from "../../components/Order";
import Axios from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import Spinner from '../../components/UI/Spinner';

class Orders extends Component{
    componentDidMount(){
        this.props.fetchOrders();
    }
    render(){
        let orders = <Spinner />;
        console.log(this.props.orders);
        if(!this.props.loading){
            orders = Object.keys(this.props.orders).map((orderKey) => {
                return(
                    <Order key={orderKey} order={this.props.orders[orderKey]}/>
                )
            });
        }
        console.log(orders);

        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state=> {
    return{
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));