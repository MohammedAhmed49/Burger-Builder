import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import { Route } from "react-router";
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
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ingredients} 
                cancelClicked={this.cancelClicked}
                continueClicked={this.continueClicked}/>

                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);
