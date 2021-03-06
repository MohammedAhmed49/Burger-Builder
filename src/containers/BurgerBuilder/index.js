import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import {addIngredient, removeIngredient, initIngredients, purchaseInit} from '../../store/actions/index';
import { connect } from 'react-redux';

export class BurgerBuilder extends Component {
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
        if(this.props.isAuth){
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth')
        }
        
    }
    cancelPurchasing = () => {
        this.setState({purchasing: false});
    }
    order = () => {
        this.props.purchaseInit();
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
                    isAuth={this.props.isAuth}
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
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
        isAuth: state.auth.idToken !== null,
        started: state.burger.started
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addIngredient: (name) => dispatch(addIngredient(name)),
        removeIngredient: (name) => dispatch(removeIngredient(name)),
        initIngredients: () => dispatch(initIngredients()),
        purchaseInit: () => dispatch(purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));