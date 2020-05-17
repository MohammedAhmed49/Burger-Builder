import React, { Component } from "react";
import CheckoutSummary from '../../components/CheckoutSummary';
class Checkout extends Component{
    state = {
        ingredients:{
            cheese: 1,
            meat: 1,
            bacon: 1,
            salad: 1
        }
    }
    

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        )
    }
}

export default Checkout;
