import React, { Component } from "react";
import Order from "../../components/Order";
import Axios from "../../axios-orders";

class Orders extends Component{
    state={
        orders: null
    }
    componentDidMount(){
        Axios.get('/orders.json')
        .then(res=>{
            
            this.setState({
                orders: res.data
            })
        });
        
    }
    render(){
        let orders = null;
        if(this.state.orders){
            orders = Object.keys(this.state.orders).map((orderKey) => {
                return(
                    <Order key={orderKey} order={this.state.orders[orderKey]}/>
                )
            });
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default Orders;