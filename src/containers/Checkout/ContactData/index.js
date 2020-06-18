import React, { Component } from "react";
import Button from '../../../components/UI/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner";
import { withRouter, Redirect } from "react-router";
import Input from '../../../components/UI/Input';
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfiq: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                rules:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfiq: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                rules:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfiq: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                rules:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfiq: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                rules:{
                    required: true,
                    minLength: 3,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfiq: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                rules:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfiq: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                rules: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    }
    
    orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for(let input in this.state.orderForm){
            formData[input] = this.state.orderForm[input].value
        }
        this.setState({
            loading: true
        })
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: formData,
            userId: this.props.userId
        }
        
        this.props.purchase(data);
        
    }
    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    changedInput = (event, inputName) => {
        const orderForm = { 
            ...this.state.orderForm 
        };
        const changedElement = {
            ...orderForm[inputName]
        };
        changedElement.value = event.target.value;
        changedElement.touched = true;
        changedElement.valid = this.checkValidity(changedElement.value, changedElement.rules);
        orderForm[inputName] = changedElement;
        let formIsValid = true;
        for(let input in orderForm){
            formIsValid = orderForm[input].valid && formIsValid;
        }
        this.setState({
            orderForm,
            formIsValid
        })
    }

    render(){
        const formInputs = [];
        for(let input in this.state.orderForm){
            formInputs.push({
                id: input,
                confiq: {...this.state.orderForm[input]}
            });
        }
        let form = <form onSubmit={this.orderHandler}>
                        {formInputs.map(input => 
                            <Input 
                            key={input.id} 
                            {...input.confiq}
                            changed={(event) => {this.changedInput(event, input.id)}}
                            invalid={!input.confiq.valid}
                            touched={input.confiq.touched}/>
                        )}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>
        if(this.props.loading){
            form = <Spinner />
        }
        let redirect = null;
        if(this.props.purchased){
            redirect = <Redirect to="/" />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.orders.loading,
        purchased: state.orders.purchased,
        userId: state.auth.userId,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        purchase: (orderData) => dispatch(actions.purchase(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, Axios)));