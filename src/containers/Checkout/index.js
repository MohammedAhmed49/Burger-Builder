import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import { Route } from "react-router";
import ContactData from "./ContactData";
class Checkout extends Component{
    state = {
        ingredients:null,
        totalPrice: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search).entries();
        const ingredients = {};
        let totalPrice = 0;
        for(const entry of query){
            if(entry[0] === 'price'){
                totalPrice = entry[1];
            } else {
                ingredients[entry[0]] = +entry[1];
            }
        }
        this.setState({
            ingredients,
            totalPrice
        });
    }

    cancelClicked = () => {
        this.props.history.goBack();
    }
    
    continueClicked = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                cancelClicked={this.cancelClicked}
                continueClicked={this.continueClicked}/>

                <Route path={this.props.match.path + '/contact-data'} render={() => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>} />
            </div>
        )
    }
}

export default Checkout;
