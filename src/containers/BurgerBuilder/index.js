import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import Checkout from '../Checkout';
import * as actionTypes from '../../store/actions/actionTypes';
import {addIngredient, removeIngredient, initIngredients} from '../../store/actions/index';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount(){
        this.props.initIngredients();
    }

    updatePurchasable = () => {
        const summingFunc = (newVal, current) => newVal + current;
        const ingredients = {...this.props.ingredients};
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce(summingFunc);
        return sum > 0;
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }
    cancelPurchasing = () => {
        this.setState({purchasing: false});
    }
    order = () => {
        this.props.history.push('/checkout');
    }

    render(){
        const disabledIngredients = {};

        if(this.props.ingredients){
            for(let ingredient in this.props.ingredients){
                disabledIngredients[ingredient] = this.props.ingredients[ingredient] <= 0;
            }
        }
        

        let orderSummary = null;

        let burger = this.props.error ? <p>{this.props.error}</p> : <Spinner />

        if(this.props.ingredients){
            orderSummary = <OrderSummary 
            ingredients={this.props.ingredients}
            cancelPurchasing={this.cancelPurchasing}
            order={this.order}
            price={this.props.totalPrice}/>;

            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients}/>

                    <BuildControls 
                    addIngredient={this.props.addIngredient} 
                    removeIngredient={this.props.removeIngredient}
                    disabledIngredients={disabledIngredients}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchasable()}
                    purchasing={this.purchasingHandler}
                    />
                </Auxiliary>
            )
        }

        return(
            <Auxiliary>
                <Modal 
                show={this.state.purchasing}
                closeModal={this.cancelPurchasing}>

                    {orderSummary}

                </Modal>

                {burger}
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addIngredient: (name) => dispatch(addIngredient(name)),
        removeIngredient: (name) => dispatch(removeIngredient(name)),
        initIngredients: () => dispatch(initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));