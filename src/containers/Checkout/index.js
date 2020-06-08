import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import { Route, Redirect } from "react-router";
import ContactData from "./ContactData";
import { connect } from "react-redux";
class Checkout extends Component{

    cancelClicked = () => {
        this.props.history.goBack();
    }
    
    continueClicked = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/" />

        if(this.props.ingredients){ // we check for ingredients because it comes from the server

            const redirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {redirect}
                    <CheckoutSummary 
                    ingredients={this.props.ingredients} 
                    cancelClicked={this.cancelClicked}
                    continueClicked={this.continueClicked}/>

                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = (state) => {
    return{
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        purchased: state.orders.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
