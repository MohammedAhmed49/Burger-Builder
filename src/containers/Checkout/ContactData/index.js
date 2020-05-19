import React, { Component } from "react";
import Button from '../../../components/UI/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner";
import { withRouter } from "react-router";

class ContactData extends Component{
    state={
        name: '',
        email: '',
        adress: {
            street: '',
            zipCode: '',
            country: ''
        },
        deliveryMethod: '',
        loading: false
    }
    
    orderHandler = (e) => {
        e.preventDefault();
        console.log(this.props.ingredients, this.props.totalPrice);
        this.setState({
            loading: true
        })
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Momo',
                email: 'mom@dsas.cs',
                adress: {
                    street: 'momomomoomo',
                    zipCode: '12315',
                    country: 'Egypt'
                },
                deliveryMethod: 'Fastest',

            }
        }
        Axios.post('/orders.json', data)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => this.setState({loading: false}));
    }

    render(){
        let form = <form>
                        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                        <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                        <input className={classes.Input} type="text" name="street" placeholder="Street" />
                        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                    </form>
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default withRouter(ContactData);