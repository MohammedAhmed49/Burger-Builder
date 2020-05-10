import React, { Component } from 'react';
import Button from '../../UI/Button';

class OrderSummary extends Component {
    render(){
        const ingredients = Object.keys(this.props.ingredients).map((igKey) => {
            return(
                <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}:</span>{this.props.ingredients[igKey]}</li>
            )
        })
        return(
            <div>
                <h3>Your Order</h3>
                <p>You ordered the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchasing}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.order}>Continue</Button>
            </div>   
        )
    }
}

export default OrderSummary;
